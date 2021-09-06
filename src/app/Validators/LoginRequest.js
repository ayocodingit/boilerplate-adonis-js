'use strict'

const { failResponse } = use('utils/Validators')
const Exists = use('utils/Rules/Exists')
const validatorMessage = require('adonis-message-validation-generator')

class LoginRequest {
  constructor () {
    Exists()
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email|exists:users,email',
      password: 'required'
    }
  }

  get messages () {
    return validatorMessage(this.rules)
  }

  async fails (errorMessages) {
    return failResponse(this.ctx.response, errorMessages)
  }
}

module.exports = LoginRequest
