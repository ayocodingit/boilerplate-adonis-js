# Boilerplate adonis js

[![Maintainability](https://api.codeclimate.com/v1/badges/9cd6b4799173f19f444b/maintainability)](https://codeclimate.com/github/ayocodingit/boilerplate-adonis-js/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9cd6b4799173f19f444b/test_coverage)](https://codeclimate.com/github/ayocodingit/boilerplate-adonis-js/test_coverage)

## Stack
- **Node.js** - [http://nodejs.org/](http://nodejs.org/)
- **Adonis Js** - [https://legacy.adonisjs.com/](https://legacy.adonisjs.com/)

## Quick Start

Clone project and install dependencies:
```bash
https://github.com/ayocodingit/boilerplate-adonis-js
cd boilerplate-adonis-js
(cd ./src && cp .env.example .env)
```

* Run manually
```
install dependencies
$ make install
migrate
$ make migrate
seed
$ make seed
test
$ make test
```

* Run on locally with docker :

```
start
$ make docker-run-dev
migrate
$ make docker-run-dev-migrate
test
$ make docker-run-dev-test
stop
$ make docker-run-dev-stop
```

* Run on production with docker :

```
start
$ make docker-run
stop
$ make docker-stop
```

## Single Repo Structure
```
├── .github/
  ├── workflows/
    ├── ...
├── docker/
  ├── ...
├── src/
  ├── app/
    ├── ...
  ├── config/
    ├── app.js
    ├── auth.js
    └── ...
  ├── database/
    ├── migrations/
    ├── seeds/
    └── factory.js
  ├── public/
  ├── resources/
    ├── ...
    └── views/
  ├── storage/
  ├── start/
    ├── app.js
    ├── kernel.js
    └── routes.js
  ├── test/
  ├── utils/
  ├── ace
  ├── server.js
  └── package.json
├── ...
```

