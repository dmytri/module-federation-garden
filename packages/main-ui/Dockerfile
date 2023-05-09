FROM node:lts-alpine3.17 as dev

WORKDIR /app

COPY package.json vite.config.js index.html /app/

RUN npm install -g pnpm@8.4.0 \
    && pnpm install

COPY src /app/src

FROM dev as build

WORKDIR /app

RUN pnpm run build

CMD ["pnpm", "run", "serve"]