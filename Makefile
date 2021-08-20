include ./src/.env
	
APP_PATH := cd ./src
DOCKER_FILE_PATH := ./docker/Dockerfile

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

docker:
	docker build -f ${DOCKER_FILE_PATH} -t ${APP_NAME} --no-cache .

run:
	docker-compose up --build -d

stop:
	docker-compose down


