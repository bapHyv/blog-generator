import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { context } from "./context";
import * as dotenv from "dotenv";

dotenv.config();

export const server = new ApolloServer({
  schema,
  context,
});

const port = 5000;

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
