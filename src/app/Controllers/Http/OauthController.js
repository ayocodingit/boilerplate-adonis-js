'use strict'

const { OAuth2Client } = require('google-auth-library')
const Config = use('Config')
const User = use('App/Models/User')
const { StatusCodes } = require('http-status-codes')
const Antl = use('Antl')

class OauthController {
  async loginWithGoogle ({ response, auth }) {
    const clientId = Config.get('service.google.clientId')
    const client = new OAuth2Client(clientId)

    try {
      const payload = await client.getTokenInfo(auth.getAuthHeader())
      const user = await this.getUserByOauthCode(payload.sub)
      const token = await auth.generate(user)
      return response.json(token)
    } catch (error) {
      return response.status(StatusCodes.BAD_REQUEST).send({ error: error.message })
    }
  }

  async getUserByOauthCode (oauthCode) {
    const user = await User.query().where('oauthCode', oauthCode).first()
    if (!user) {
      throw new Error(Antl.formatMessage('auth.failed'))
    }

    return user
  }
}

module.exports = OauthController
