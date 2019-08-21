FROM node:12-alpine AS builder

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --production

FROM node:12-alpine

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY . /app
