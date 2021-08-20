'use strict'

const { OAuth2Client } = require('google-auth-library')
const Config = use('Config')
const User = use('App/Models/User')
const { StatusCodes } = require('http-status-codes')
const Antl = use('Antl')
const googleClientId = Config.get('service.google.clientId')
const client = new OAuth2Client(googleClientId)

class OauthController {
  async loginWithGoogle ({ response, auth }) {
    try {
      const payload = await client.getTokenInfo(auth.getAuthHeader())
      const user = await this.getUserByOauthCode(payload)
      const token = await auth.generate(user)
      return response.json(token)
    } catch (error) {
      return response.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
  }

  async getUserByOauthCode (payload, isSignUp = false) {
    const user = await User.query().where('oauth_code', payload.sub).first()

    if (!user && !isSignUp) {
      throw new Error(Antl.formatMessage('auth.user_not_exist'))
    }

    return user
  }
}

module.exports = OauthController
