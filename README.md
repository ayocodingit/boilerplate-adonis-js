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
make install
make migrate
make seed
```

Run tests (tester app):
```bash
make test
```

Start the server (optional if running without docker):
```bash
make start
```

Start the server (optional if running with docker):
```bash
make docker-run
```

Stop the server (optional if running with docker):
```bash
make docker-stop
```

Running On Locally by Docker 
```bash
make docker-run-dev
```

Migrate On Locally by Docker 
```bash
make docker-run-dev-migrate
```

Stop On Locally by Docker 
```bash
make docker-run-dev-stop
```

Test On Locally by Docker
```bash
make docker-run-dev-test
```

## Project Structure
```

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

```

