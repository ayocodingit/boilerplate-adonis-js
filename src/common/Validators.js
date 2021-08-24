'use strict'

const { StatusCodes } = require('http-status-codes')

const failResponse = (ctx, errorMessages) => {
  return ctx.response
    .status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ errors: errorMessages })
}

module.exports = {
  failResponse
}
