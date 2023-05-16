FROM node:lts-alpine3.17

WORKDIR /app

RUN npm i -g pnpm

COPY pnpm-lock.yaml .npmrc ./

RUN pnpm fetch

COPY . ./

RUN pnpm install -r  \
    && pnpm -r build


EXPOSE 5004

CMD ["pnpm", "-r", "run", "serve"]
