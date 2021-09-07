'use strict'

const { failResponse } = use('utils/Validators')
const validatorMessage = require('adonis-message-validation-generator')

class Validator {
  get validateAll () {
    return true
  }

  get rules () {
    return {}
  }

  get messages () {
    return validatorMessage(this.rules)
  }

  async fails (errorMessages) {
    return failResponse(this.ctx.response, errorMessages)
  }
}

module.exports = Validator
