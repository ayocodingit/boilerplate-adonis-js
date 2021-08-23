'use strict'

const { StatusCodes } = require('http-status-codes')

module.exports = (ctx, errorMessages) => {
  return ctx.response
    .status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ errors: errorMessages })
}
