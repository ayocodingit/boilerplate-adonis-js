'use strict'

const { formatMessage } = use('Antl')
const { failResponse } = use('utils/Validators')
const RoleEnum = use('App/Enums/RoleEnum')
const { getTokenInfoGoogle } = use('utils/Oauth')

class RoleRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      sub: 'unique:users,sub',
      email: 'unique:users,email',
      role: `required|in:${RoleEnum.getString('value')}`
    }
  }

  async data () {
    const requestBody = this.ctx.request.all()
    const payloadGoogle = await getTokenInfoGoogle(this.ctx.request)
    return Object.assign({}, requestBody, payloadGoogle)
  }

  get messages () {
    return {
      'role.required': formatMessage('validation.required', { attribute: 'role' }),
      'role.in': formatMessage('validation.in', { attribute: 'role', other: RoleEnum.getStringWithSpace('value') }),
      'sub.unique': formatMessage('validation.unique', { attribute: 'sub' }),
      'email.unique': formatMessage('validation.unique', { attribute: 'email' })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = RoleRequest
