'use strict'

const { formatMessage } = use('Antl')
const { failResponse } = use('utils/Validators')
const RoleEnum = use('App/Enums/RoleEnum')
const validatorMessage = require('adonis-message-validation-generator')

class SignUpRequest {
  get validateAll () {
    return true
  }

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

  async fails (errorMessages) {
    return failResponse(this.ctx.response, errorMessages)
  }
}

module.exports = SignUpRequest
