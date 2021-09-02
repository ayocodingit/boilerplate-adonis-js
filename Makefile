include ./src/.env
	
APP_PATH := cd ./src
DOCKER_FILE_PATH := ./docker/dockerfile
ENV_PATH := ./src/.env
DOCKER_APP_NAME := adonis-app
DOCKER_ENV_PATH := --env-file ${ENV_PATH}
DOCKER_DEV := -f docker-compose-dev.yml ${DOCKER_ENV_PATH}
DOCKER_DEV_EXEC := ${DOCKER_DEV} exec ${DOCKER_APP_NAME}

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
	docker-compose ${DOCKER_ENV_PATH} up -d --build

docker-stop:
	docker-compose ${DOCKER_ENV_PATH} down

docker-run-dev:
	docker-compose ${DOCKER_DEV} up -d

docker-run-dev-stop:
	docker-compose ${DOCKER_DEV} down

docker-run-dev-install:
	docker-compose ${DOCKER_DEV_EXEC} npm install

docker-run-dev-migrate:
	docker-compose ${DOCKER_DEV_EXEC} node ace migration:run

docker-run-dev-migrate-refresh:
	docker-compose ${DOCKER_DEV_EXEC} node ace migration:refresh

docker-run-dev-seed:
	docker-compose ${DOCKER_DEV_EXEC} node ace seed

docker-run-dev-test:
	docker-compose ${DOCKER_DEV_EXEC} npm run test
