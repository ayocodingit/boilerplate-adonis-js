'use strict'

const Antl = use('Antl')
const { failResponse } = use('utils/Validators')

class UpdatePasswordRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      password: 'required|confirmed'
    }
  }

  get messages () {
    return {
      'password.required': Antl.formatMessage('validation.required', { attribute: 'password' }),
      'password.confirmed': Antl.formatMessage('validation.confirmed', { attribute: 'password' })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = UpdatePasswordRequest
