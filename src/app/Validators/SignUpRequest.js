'use strict'

const { formatMessage } = use('Antl')
const { failResponse, validatorMessage } = use('utils/Validators')
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
    return Object.assign({}, validatorMessage(this.rules), {
      'role.in': formatMessage('validation.in', { attribute: 'role', other: RoleEnum.getStringWithSpace('value') })
    })
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = SignUpRequest
