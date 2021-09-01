'use strict'

const { formatMessage } = use('Antl')
const { failResponse } = use('utils/Validators')
const User = use('App/Models/User')
const Hash = use('Hash')

class UpdatePasswordRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      password_valid: 'equals:true',
      password_old: 'required',
      password: 'required|min:6|confirmed'
    }
  }

  async get data () {
    const requestBody = this.ctx.request.all()
    const auth = await this.ctx.auth.getUser()
    const user = await User.query().setVisible(['password']).where('id', auth.id).first()
    const password = user.password

    const passwordValid = { password_valid: 'false'}
    if (await Hash.verify(this.ctx.request.input('password'), password)) {
      passwordValid.password_valid = 'true'
    }
    return Object.assign({}, requestBody, passwordValid)
  }

  get messages () {
    return {
      'password_valid.equals': formatMessage('validation.same', { attribute: 'password_old', other: 'password sebelumnya' }),
      'password.required': formatMessage('validation.required', { attribute: 'password' }),
      'password.min': formatMessage('validation.min_numeric', { attribute: 'password', min: 6 }),
      'password.confirmed': formatMessage('validation.confirmed', { attribute: 'password' }),
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = UpdatePasswordRequest
