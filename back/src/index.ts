import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import { schema } from "./schema";
import { context, prisma } from "./context";
import * as dotenv from "dotenv";
import { decodeAuthHeader } from "./utils/auth";
import { pubSub } from "./pubsub";

dotenv.config();

(async function () {
  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx) => {
        // The context of the ws server is different from the context I pass to the server.
        const token = ctx.connectionParams?.authentication;
        const decoded = decodeAuthHeader(token as string) || null;

        return {
          prisma,
          writerId: decoded?.writerId,
          writerEmail: decoded?.writerEmail,
          writerRole: decoded?.writerRole,
          pubSub,
        };
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  // Click jacking protection
  app.use(function (_, res, next) {
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
    next();
  });

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000"],
    }),
    bodyParser.json(),
    expressMiddleware(server, { context })
  );

  const port = 5000;

  httpServer.listen(port, () => {
    console.log(`🚀  Server ready at http://localhost:${port}/graphql`);
  });
})();
