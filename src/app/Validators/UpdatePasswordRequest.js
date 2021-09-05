'use strict'

const { failResponse, validatorMessage } = use('utils/Validators')

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
    return Object.assign({}, validatorMessage(this.rules))
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = UpdatePasswordRequest
