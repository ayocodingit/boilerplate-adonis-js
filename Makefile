include ./src/.env
	
APP_PATH := cd ./src
DOCKER_FILE_PATH := ./docker/dockerfile
ENV_PATH := ./src/.env
DOCKER_APP_NAME := adonis-app

install:	
	${APP_PATH}; npm install

dev:	
	${APP_PATH}; npm run dev

start:
	${APP_PATH}; npm run start

test:
	${APP_PATH}; npm run test

lint:
	${APP_PATH}; npm run lint:fix

migrate:
	${APP_PATH}; node ace migration:run

seed:
	${APP_PATH}; node ace seed

docker-build:
	docker build -f ${DOCKER_FILE_PATH} -t ${APP_NAME} --no-cache .

docker-run:
	docker-compose --env-file ${ENV_PATH} up -d --build

docker-stop:
	docker-compose --env-file ${ENV_PATH} down

docker-run-dev:
	docker-compose -f docker-compose-dev.yml --env-file ${ENV_PATH} up -d

docker-run-dev-stop:
	docker-compose -f docker-compose-dev.yml --env-file ${ENV_PATH} down

docker-run-dev-install:
	docker-compose -f docker-compose-dev.yml --env-file ${ENV_PATH} exec ${DOCKER_APP_NAME} npm install

docker-run-dev-migrate:
	docker-compose -f docker-compose-dev.yml --env-file ${ENV_PATH} exec ${DOCKER_APP_NAME} node ace migration:run

docker-run-dev-migrate-refresh:
	docker-compose -f docker-compose-dev.yml --env-file ${ENV_PATH} exec ${DOCKER_APP_NAME} node ace migration:refresh

docker-run-dev-seed:
	docker-compose -f docker-compose-dev.yml --env-file ${ENV_PATH} exec ${DOCKER_APP_NAME} node ace seed

docker-run-dev-test:
	docker-compose -f docker-compose-dev.yml --env-file ${ENV_PATH} exec ${DOCKER_APP_NAME} npm run test
