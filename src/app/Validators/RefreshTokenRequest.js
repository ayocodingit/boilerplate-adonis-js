'use strict'

const { formatMessage } = use('Antl')
const { failResponse, validatorMessage } = use('utils/Validators')

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
    return Object.assign({}, validatorMessage(this.rules))
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = RefreshTokenRequest
