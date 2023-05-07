FROM node:lts-alpine3.17

WORKDIR /app

COPY src/package.json src/pnpm-lock.yaml src/index.js .

RUN npm install -g pnpm@8.4.0 \
    && pnpm install

COPY src .

CMD ["pnpm", "run", "start"]
