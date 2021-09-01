'use strict'

const { formatMessage } = use('Antl')
const { failResponse } = use('utils/Validators')
const RoleEnum = use('App/Enums/RoleEnum')

class SignUpRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      role: `required|in:${RoleEnum.getString('value')}`
    }
  }

  get messages () {
    return {
      'role.required': formatMessage('validation.required', { attribute: 'role' }),
      'role.in': formatMessage('validation.in', { attribute: 'role', other: RoleEnum.getStringWithSpace('value') })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = SignUpRequest
