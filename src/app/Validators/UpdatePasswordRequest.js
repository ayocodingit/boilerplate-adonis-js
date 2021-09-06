'use strict'

const { failResponse, validatorMessage } = use('utils/Validators')
const { formatMessage } = use('Antl')

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
    return Object.assign(validatorMessage(this.rules), {
      'password.min': formatMessage('validator.min', { attribute: 'password', min: 6 })
    })
  }

  async fails (errorMessages) {
    return failResponse(this.ctx.response, errorMessages)
  }
}

module.exports = UpdatePasswordRequest
