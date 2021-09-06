'use strict'

const validatorMessage = require('adonis-message-validation-generator')
const { failResponse } = use('utils/Validators')

class GoogleRequest {
  get validateAll () {
    return true
  }

  static get rules () {
    return {
      code: 'required',
      redirect_uri: 'required|url',
      code_verifier: 'required'
    }
  }

  static get messages () {
    return validatorMessage(this.rules)
  }

  async fails (errorMessages) {
    return failResponse(this.ctx.response, errorMessages)
  }
}

module.exports = GoogleRequest
