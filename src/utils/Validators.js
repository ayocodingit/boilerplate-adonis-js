'use strict'

const { StatusCodes } = require('http-status-codes')

const failResponse = (ctx, errorMessages) => {
  return ctx.response
    .status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ errors: formatMessage(errorMessages) })
}

const formatMessage = (errorMessages) => {
  const errors = {}

  for (const error of errorMessages) {
    errors[error.field] = [error.message]
  }

  return errors
}

module.exports = {
  failResponse,
  formatMessage
}
