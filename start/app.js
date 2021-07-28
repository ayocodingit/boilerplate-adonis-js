'use strict'

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const path = require('path')

const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  'adonis-sentry/providers/Sentry',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/vow/providers/VowProvider',
  '@adonisjs/antl/providers/AntlProvider',
  '@adonisjs/drive/providers/DriveProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/framework/providers/ViewProvider',
  "adonis-scheduler/providers/SchedulerProvider",
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  'adonisjs-queue/providers/QueueProvider',
  'adonisjs-queue/providers/JobProvider',
  path.join(__dirname, '..', 'providers', 'ExistProvider')
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  "adonis-scheduler/providers/CommandsProvider",
  'adonisjs-queue/providers/JobCommandsProvider'
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  Scheduler: "Adonis/Addons/Scheduler"
}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = []

module.exports = { providers, aceProviders, aliases, commands }
