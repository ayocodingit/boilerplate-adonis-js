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

const validatorMessage = (rules) => {
  let messages = {}

  for (const property in rules) {
    messages = validatorMapping(rules[property].split('|'), property, messages)
  }
  return messages
}

const validatorMapping = (rules, property, messages) => {
  const { formatMessage } = use('Antl')

  for (const rule of rules) {
    const key = rule.split(':')[0]
    if (limitValidation.includes(key)) {
      messages[`${property}.${key}`] = formatMessage(`validation.${key}`, { attribute: property })
    }
  }
  return messages
}

const limitValidation = [
  'required',
  'email',
  'exists',
  'url',
  'confirmed',
  'integer',
  'date',
  'boolean',
  'string',
  'unique',
  'number',
  'alpha'
]

module.exports = {
  failResponse,
  formatMessage,
  validatorMessage
}
