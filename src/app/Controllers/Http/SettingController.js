'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const CustomException = use('App/Exceptions/CustomException')
const { StatusCodes } = require('http-status-codes')
class SettingController {
  async updatePassword ({ auth, request, response }) {
    const user = await auth.getUser()
    await this.checkPasswordOld(user, request.input('password_old'))
    user.password = request.input('password')
    await user.save()
    return response.json({ message: 'password updated' })
  }

  async checkPasswordOld(user, password) {
    const payload = await User.query().setVisible(['password']).where('id', user.uid).first()
    if (await Hash.verify(password, payload.password)) {
      throw new CustomException(formatMessage('auth.password_old_not_match'), StatusCodes.FORBIDDEN)
    }
  }
}

module.exports = SettingController
