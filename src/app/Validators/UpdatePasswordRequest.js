'use strict'

const { validatorMessage } = use('utils/Validators')
const { formatMessage } = use('Antl')
const Validator = use('utils/Validator')

class UpdatePasswordRequest extends Validator {
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
}

module.exports = UpdatePasswordRequest
