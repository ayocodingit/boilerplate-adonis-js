'use strict'

const { formatMessage } = use('Antl')
const RoleEnum = use('App/Enums/RoleEnum')
const validatorMessage = require('adonis-message-validation-generator')
const Validator = use('utils/Validator')

class SignUpRequest extends Validator {
  get rules () {
    return {
      role: `required|in:${RoleEnum.valuesString}`
    }
  }

  get messages () {
    return Object.assign(validatorMessage(this.rules), {
      'role.in': formatMessage('validation.in', { attribute: 'role', other: RoleEnum.valuesStringWithSpace })
    })
  }
}

module.exports = SignUpRequest
