FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY proto/vehiculos.proto ./proto/

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/proto ./proto

EXPOSE 4000

CMD [ "node", "dist/index.js" ]
