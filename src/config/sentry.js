'use strict'

const Env = use('Env')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const { ioc: app } = require('@adonisjs/fold')

module.exports = {

  /*
   |--------------------------------------------------------------------------
   | API key
   |--------------------------------------------------------------------------
   */
  dsn: Env.get('SENTRY_DSN'),

  environment: Env.get('SENTRY_ENVIRONMENT'),

  options: {
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({
        app
      })
    ],
    tracesSampleRate: parseFloat(Env.get('SENTRY_TRACE_SAMPLE_RATE', 0.0))
  }
}
