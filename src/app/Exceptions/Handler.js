'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Logger = use('Logger')
const Sentry = use('Sentry')
const Config = use('Config')
const { StatusCodes, getReasonPhrase } = require('http-status-codes')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { response }) {
    if (
      error.status >= StatusCodes.INTERNAL_SERVER_ERROR &&
      Config.get('env') === 'production'
    ) {
      error.message = getReasonPhrase(error.status)
    }

    response.status(error.status).json({ error: error.message })
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    if (error.status >= StatusCodes.INTERNAL_SERVER_ERROR) {
      Logger.info({
        method: request.method(),
        url: request.url(),
        status: error.status,
        'user-agent': request.headers()['user-agent'],
        date: new Date(),
        message: error.message
      })
      Sentry.captureException(error)
    }
  }
}

module.exports = ExceptionHandler
