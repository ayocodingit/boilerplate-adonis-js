'use strict'

const Antl = use('Antl')
const { failResponse } = use('utils/Validators')
const Exists = use('utils/Rules/Exists')

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
    return {
      'email.required': Antl.formatMessage('validation.required', { attribute: 'email' }),
      'email.email': Antl.formatMessage('validation.email', { attribute: 'email' }),
      'email.exists': Antl.formatMessage('validation.exists', { attribute: 'email' }),
      'password.required': Antl.formatMessage('validation.required', { attribute: 'password' })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = LoginRequest
