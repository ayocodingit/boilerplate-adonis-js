'use strict'

const { responseToken } = use('Common/Models')
class AuthController {
  async login ({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.withRefreshToken().attempt(email, password)
    return response.json(await responseToken(auth, token))
  }

  async refreshToken ({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const token = await auth.generateForRefreshToken(refreshToken, true)
    return response.json(await responseToken(auth, token))
  }
}

module.exports = AuthController
