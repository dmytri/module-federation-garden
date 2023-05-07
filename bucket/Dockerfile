FROM node:lts-alpine3.17

WORKDIR /app

COPY app/package.json app/pnpm-lock.yaml app/index.js .

RUN npm install -g pnpm@8.4.0 \
    && pnpm install

COPY src .

CMD ["pnpm", "run", "start"]
