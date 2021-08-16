FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3333

RUN chmod +x docker-entrypoint.sh

ENTRYPOINT [ "docker-entrypoint.sh" ]
