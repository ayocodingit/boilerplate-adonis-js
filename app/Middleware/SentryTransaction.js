'use strict'

const Sentry = use('Sentry')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class SentryTransaction {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    const transaction = Sentry.startTransaction({
      op: 'transaction',
      name: request.url()
    })

    Sentry.configureScope(scope => {
      scope.setSpan(transaction)
    })

    await next()

    transaction.finish()
  }
}

module.exports = SentryTransaction
