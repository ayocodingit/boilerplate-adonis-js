'use strict'

const { formatMessage } = use('Antl')
const { failResponse, validatorMessage } = use('utils/Validators')
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
    return Object.assign({}, validatorMessage(this.rules))
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = LoginRequest
