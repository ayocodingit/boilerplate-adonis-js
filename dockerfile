FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3333

CMD ["node", "server.js"]
