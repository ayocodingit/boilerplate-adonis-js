'use strict'

const User = use('App/Models/User')
const { StatusCodes } = require('http-status-codes')
const CustomException = use('App/Exceptions/CustomException')
const { formatMessage } = use('Antl')
const { generateToken } = use('utils/Jwt')
const { getTokenInfoGoogle } = use('utils/Oauth')

class OauthController {
  async signInWithGoogle ({ response, auth, request }) {
    try {
      const payload = await getTokenInfoGoogle(request)
      const user = await this.getUserByOauthCode(payload)
      return response.json(await generateToken(auth, user))
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async signUpWithGoogle ({ response, auth, request }) {
    try {
      const payload = await getTokenInfoGoogle(request)
      await this.checkValidSignUpGoogle(payload)

      const user = new User()
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

  async checkValidSignUpGoogle (payload) {
    const user = await User.query()
      .where(query => {
        query.where('oauth_code', payload.sub)
          .orWhere('email', payload.email)
      })
      .first()

    if (user) {
      throw new CustomException(formatMessage('auth.user_exist'), StatusCodes.UNAUTHORIZED)
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
