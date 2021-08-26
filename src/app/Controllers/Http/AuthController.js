'use strict'

const { responseToken } = use('utils/Jwt')
const User = use('App/Models/User')

class AuthController {
  async login ({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.withRefreshToken().attempt(email, password, true)
    const user = await User.findBy('email', email)
    return response.json(await responseToken(user, token))
  }

  async refreshToken ({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const token = await auth.generateForRefreshToken(refreshToken, true)
    return response.json(await responseToken(await auth.getUser(), token))
  }

  async logout ({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    await auth.revokeTokens([refreshToken], true)
    return response.json({ message: 'logout' })
  }
}

module.exports = AuthController
