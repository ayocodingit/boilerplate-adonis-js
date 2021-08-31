'use strict'

const { OAuth2Client } = require('google-auth-library')
const Config = use('Config')
const User = use('App/Models/User')
const { StatusCodes } = require('http-status-codes')
const CustomException = use('App/Exceptions/CustomException')
const { formatMessage } = use('Antl')
const googleClientId = Config.get('service.google.clientId')
const googleClientSecret = Config.get('service.google.clientSecret')
const googleClient = new OAuth2Client(googleClientId, googleClientSecret)
const { generateToken } = use('utils/Jwt')

class OauthController {
  async signInWithGoogle ({ response, auth, request }) {
    try {
      const payload = await this.getTokenInfoGoogle(request)
      const user = await this.getUserByOauthCode(payload)
      return response.json(await generateToken(auth, user))
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async signUpWithGoogle ({ response, auth, request }) {
    try {
      const payload = await this.getTokenInfoGoogle(request)

      await this.checkValidSignUpGoogle(request, payload)

      const user = new User()
      user.email = request.input('email')
      user.username = request.input('name')
      user.avatar = request.input('picture')
      user.oauth_code = request.input('sub')
      user.role = request.input('role')
      user.password = Math.random().toString(36).substring(2, 15)
      await user.save()
      return response.json(await generateToken(auth, user))
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async getTokenInfoGoogle (request) {
    try {
      const payload = request.only(['code', 'redirect_uri'])
      payload.codeVerifier = request.input('code_verifier')
      const { tokens } = await googleClient.getToken(payload)
      return await googleClient.getTokenInfo(tokens.access_token)
    } catch (error) {
      console.log(error.message)
      throw new CustomException(error.message, StatusCodes.UNAUTHORIZED)
    }
  }

  async checkValidSignUpGoogle (request, payload) {
    if (
      request.input('email') !== payload.email ||
      request.input('sub') !== payload.sub
    ) {
      throw new CustomException(formatMessage('auth.register_not_match'), StatusCodes.UNAUTHORIZED)
    }
  }

  async getUserByOauthCode (payload) {
    const user = await User.query()
      .where('oauth_code', payload.sub)
      .orWhere('email', payload.email)
      .first()

    if (!user) {
      throw new CustomException(formatMessage('auth.user_not_exist'), StatusCodes.UNAUTHORIZED)
    }

    if (!user.oauth_code) {
      user.oauth_code = payload.sub
      await user.save()
    }

    return user
  }
}

module.exports = OauthController
