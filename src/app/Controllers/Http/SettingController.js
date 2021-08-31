'use strict'

class SettingController {
  async updatePassword ({ auth, request, response }) {
    const user = await auth.getUser()
    user.password = request.input('password')
    await user.save()
    return response.json({ message: 'password updated' })
  }
}

module.exports = SettingController
