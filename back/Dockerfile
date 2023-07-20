FROM node:lts

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV PRISMA_FORCE_NAPI=true

RUN npx prisma generate

CMD npm run dev