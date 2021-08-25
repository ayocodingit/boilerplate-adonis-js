'use strict'

const Antl = use('Antl')
const { failResponse } = use('utils/Validators')
const RoleEnum = use('App/Enums/RoleEnum')

class SignUpRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email|unique:users,email',
      sub: 'required|unique:users,oauth_code',
      name: 'required',
      role: `required|in:${RoleEnum.getString('value')}`
    }
  }

  get messages () {
    return {
      'email.required': Antl.formatMessage('validation.required', { attribute: 'email' }),
      'email.email': Antl.formatMessage('validation.email', { attribute: 'email' }),
      'email.unique': Antl.formatMessage('validation.unique', { attribute: 'email' }),
      'sub.required': Antl.formatMessage('validation.required', { attribute: 'sub' }),
      'sub.unique': Antl.formatMessage('validation.unique', { attribute: 'sub' }),
      'name.required': Antl.formatMessage('validation.required', { attribute: 'name' }),
      'role.required': Antl.formatMessage('validation.required', { attribute: 'role' }),
      'role.in': Antl.formatMessage('validation.in', { attribute: 'role', other: RoleEnum.getStringWithSpace('value') })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = SignUpRequest
