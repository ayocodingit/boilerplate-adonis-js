'use strict'

const { formatMessage } = use('Antl')
const { failResponse, validatorMessage } = use('utils/Validators')

class GoogleRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      code: 'required',
      redirect_uri: 'required|url',
      code_verifier: 'required'
    }
  }

  get messages () {
    return Object.assign({}, validatorMessage(this.rules))
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = GoogleRequest
