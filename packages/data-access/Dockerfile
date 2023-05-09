FROM node:lts-alpine3.17

WORKDIR /app

COPY package.json /app/
COPY src/ /app/src/

RUN npm install -g pnpm@8.4.0 \
    && pnpm install

CMD ["pnpm", "run", "start"]