'use strict'

const Antl = use('Antl')
const failResponse = use('Utils/Validators')

class UserRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email|unique:users,email,id,NULL',
      password: 'required'
    }
  }

  get messages () {
    return {
      'email.required': Antl.formatMessage('validation.required', { attribute: 'Email' }),
      'email.email': Antl.formatMessage('validation.email', { attribute: 'Email' }),
      'email.unique': Antl.formatMessage('validation.unique', { attribute: 'Email' }),
      'password.required': Antl.formatMessage('validation.required', { attribute: 'password' })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = UserRequest
