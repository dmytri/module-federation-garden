FROM node:lts-alpine3.17 as dev

WORKDIR /app

COPY app/package.json \
     app/pnpm-lock.yaml \
     app/index.html \
     app/vite.config.js \
     .

RUN npm install -g pnpm@8.4.0 \
    && pnpm install

COPY /app/src /app/src

FROM dev as build

WORKDIR /app

RUN pnpm run build

CMD ["pnpm", "run", "serve"]
