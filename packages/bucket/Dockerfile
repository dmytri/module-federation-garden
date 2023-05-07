FROM node:lts-alpine3.17

WORKDIR /app

COPY package.json pnpm-lock.yaml index.js /app/

RUN npm install -g pnpm@8.4.0 \
    && pnpm install

COPY 1.0.0/ /app/1.0.0/
COPY 1.0.1/ /app/1.0.1/
COPY 1.0.2/ /app/1.0.2/

CMD ["pnpm", "run", "start"]