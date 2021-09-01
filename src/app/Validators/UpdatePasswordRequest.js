'use strict'

const { formatMessage } = use('Antl')
const { failResponse } = use('utils/Validators')

class UpdatePasswordRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      password_old: 'required',
      password: 'required|min:6|confirmed'
    }
  }

  get messages () {
    return {
      'password_old.required': formatMessage('validation.required', { attribute: 'password_old' }),
      'password.required': formatMessage('validation.required', { attribute: 'password' }),
      'password.min': formatMessage('validation.min_numeric', { attribute: 'password', min: 6 }),
      'password.confirmed': formatMessage('validation.confirmed', { attribute: 'password' })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = UpdatePasswordRequest
