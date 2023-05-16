FROM node:lts-alpine3.17

WORKDIR /app

RUN npm i -g pnpm

COPY pnpm-lock.yaml  ./

RUN pnpm fetch

COPY . ./

RUN pnpm install -r \
    && pnpm -r build

EXPOSE 5003

CMD ["node", "apps/main-server/dist/index.js"]

