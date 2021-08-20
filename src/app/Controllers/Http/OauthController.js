'use strict'

const { OAuth2Client } = require('google-auth-library')
const Config = use('Config')
const User = use('App/Models/User')
const { StatusCodes } = require('http-status-codes')
const Antl = use('Antl')
const googleClientId = Config.get('service.google.clientId')
const googleClient = new OAuth2Client(googleClientId)

class OauthController {
  async logInWithGoogle ({ response, auth }) {
    try {
      const payload = await googleClient.getTokenInfo(auth.getAuthHeader())
      const user = await this.getUserByOauthCode(payload)
      const token = await auth.generate(user)
      return response.json(token)
    } catch (error) {
      return response.status(StatusCodes.UNAUTHORIZED).json({ error: error.message })
    }
  }

  async signUpWithGoogle ({ response, auth, request }) {
    try {
      const payload = await googleClient.getTokenInfo(auth.getAuthHeader())

      await this.checkValidSignUpGoogle(request, payload)

      const user = new User()
      user.email = request.get('email')
      user.username = request.get('name')
      user.avatar = request.get('picture')
      user.oauth_code = request.get('sub')
      user.role = request.get('role')
      await user.save()

      const token = await auth.generate(user)
      return response.json(token)
    } catch (error) {
      return response.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
  }

  async checkValidSignUpGoogle (request, payload) {
    if (
      request.get('email') !== payload.email ||
      request.get('sub') !== payload.sub
    ) {
      throw new Error(Antl.formatMessage('auth.user_not_exist'))
    }
  }

  async getUserByOauthCode (payload) {
    const user = await User.query()
      .where('oauth_code', payload.sub)
      .orWhere('email', payload.email)
      .first()

    if (!user) {
      throw new Error(Antl.formatMessage('auth.user_not_exist'))
    }

    return user
  }
}

module.exports = OauthController
