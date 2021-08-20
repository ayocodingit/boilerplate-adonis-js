'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CustomException extends LogicalException {
  constructor (message, code) {
    super(message, code)
  }
}

module.exports = CustomException
