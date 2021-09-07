'use strict'

const Validator = use('utils/Validator')

class LoginRequest extends Validator {
  get rules () {
    return {
      email: 'required|email|exists:users,email',
      password: 'required'
    }
  }
}

module.exports = LoginRequest
