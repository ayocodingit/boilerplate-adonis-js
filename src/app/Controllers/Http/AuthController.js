'use strict'

class AuthController {
  async login ({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.withRefreshToken().attempt(email, password)
    return response.json(token)
  }

  async refreshToken ({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const token = await auth.generateForRefreshToken(refreshToken, true)
    return response.json(token)
  }
}

module.exports = AuthController
