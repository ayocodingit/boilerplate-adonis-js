'use strict'

const User = use('App/Models/User')
const { StatusCodes } = require('http-status-codes')
const CustomException = use('App/Exceptions/CustomException')
const { formatMessage } = use('Antl')
const { generateToken, refreshToken } = use('utils/Jwt')
const { getTokenInfoGoogle } = use('utils/Oauth')
const { validateAll } = use('Validator')
const GoogleRequest = new (use('App/Validators/GoogleRequest'))
const { failResponse } = use('utils/Validators')

class OauthController {
  async signInWithGoogle ({ response, auth, request }) {
    try {
      if (request.input('refresh_token')) return await refreshToken(auth, request.input('refresh_token'))

      const validation = await validateAll(request.all(), GoogleRequest.rules, GoogleRequest.messages)
      if (validation.fails()) return failResponse(response, validation.messages())

      const payload = await getTokenInfoGoogle(request)
      const user = await this.getUser(payload)
      this.checkValidUser(user)
      return response.json(await generateToken(auth, user))
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async signUpWithGoogle ({ response, auth, request }) {
    try {
      const payload = await getTokenInfoGoogle(request)
      let user = await this.getUser(payload)
      this.checkValidUser(user, 'sign_up')

      user = new User()
      user.email = payload.email
      user.username = payload.name
      user.avatar = payload.picture
      user.oauth_code = payload.sub
      user.role = request.input('role')
      user.password = Math.random().toString(36).substring(2, 15)
      await user.save()

      return response.json(await generateToken(auth, user))
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async getUser (payload) {
    return await User.query()
      .where('oauth_code', payload.sub)
      .orWhere('email', payload.email)
      .first()
  }

  checkValidUser (user, authType = 'sign_in') {
    if (user && authType === 'sign_up') {
      throw new CustomException(formatMessage('auth.user_exist'), StatusCodes.UNAUTHORIZED)
    } else if (!user && authType === 'sign_in') {
      throw new CustomException(formatMessage('auth.user_not_exist'), StatusCodes.UNAUTHORIZED)
    }
  }
}

module.exports = OauthController
