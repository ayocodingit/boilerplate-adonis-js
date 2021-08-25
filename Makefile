include ./src/.env
	
APP_PATH := cd ./src
DOCKER_FILE_PATH := ./docker/dockerfile
ENV_PATH := ./src/.env

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
	docker-compose --env-file ${ENV_PATH} up

docker-stop:
	docker-compose down

docker-run-dev:
	docker-compose -f docker-compose-dev.yml --env-file ${ENV_PATH} up

docker-run-dev-stop:
	docker-compose -f docker-compose-dev.yml --env-file ${ENV_PATH} down







