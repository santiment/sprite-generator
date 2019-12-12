FROM node:12-alpine AS builder

ENV NODE_ENV production

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --production

FROM node:12-alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY . /app

CMD node cli.js
