'use strict'

const { formatMessage } = use('Antl')
const { failResponse } = use('utils/Validators')

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
    return {
      'code.required': formatMessage('validation.required', { attribute: 'code' }),
      'redirect_uri.required': formatMessage('validation.email', { attribute: 'redirect_uri' }),
      'redirect_uri.url': formatMessage('validation.url', { attribute: 'redirect_uri' }),
      'code_verifier.required': formatMessage('validation.required', { attribute: 'code_verifier' })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = GoogleRequest
