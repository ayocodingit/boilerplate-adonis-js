# Adonis API application

the boilerplate for creating an API server in [AdonisJs](https://legacy.adonisjs.com/), it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Development


## Quick Start Running On Locally by Docker 
`docker-compose -f docker-compose-dev.yml up`

## Setup for Development
- Download latest release from https://github.com/ayocodingit/boilerplate-adonis-js.git
- run `npm install` for installing dependencies.
- Copy `.env.example` to `.env` and set your database connection details
- Run `npm run start`

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
