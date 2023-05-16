FROM node:lts-alpine3.17

WORKDIR /app

RUN npm i -g pnpm

COPY pnpm-lock.yaml ./

RUN pnpm fetch

COPY . ./

RUN pnpm install -r \
    && pnpm -r build

EXPOSE 5002

CMD ["node",  "apps/data-access/dist/index.js"]