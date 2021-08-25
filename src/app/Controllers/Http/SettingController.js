'use strict'

const User = use('App/Models/User')

class SettingController {
  async updatePassword ({ auth, request, response }) {
    const user = await auth.getUser()
    await User.query().where('id', user.id).update(request.only('password'))
    return response.json({ message: 'password updated' })
  }
}

module.exports = SettingController
