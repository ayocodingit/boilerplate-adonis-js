'use strict'

const { failResponse } = use('utils/Validators')
const validatorMessage = require('adonis-message-validation-generator')

class RefreshTokenRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      refresh_token: 'required'
    }
  }

  get messages () {
    return validatorMessage(this.rules)
  }

  async fails (errorMessages) {
    return failResponse(this.ctx.response, errorMessages)
  }
}

module.exports = RefreshTokenRequest
