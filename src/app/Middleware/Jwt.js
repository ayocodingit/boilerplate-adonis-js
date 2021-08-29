'use strict'

const { formatMessage } = use('Antl')
const { StatusCodes } = require('http-status-codes')
const Token = use('App/Models/Token')
const CustomException = use('App/Exceptions/CustomException')

class Jwt {
  /**
   * @param {object} ctx
   * @param {Function} next
   */
  async handle ({ auth }, next) {
    try {
      const user = await auth.getUser()
      const token = await Token.query().where('user_id', user.id).orderBy('created_at', 'desc').first()
      await this.checkTokenInvalid(token, user)
      await next()
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async checkTokenInvalid (token, user) {
    if (!token) {
      throw new CustomException(formatMessage('auth.jwt_invalid'), StatusCodes.UNAUTHORIZED)
    }
    if (token.is_revoked) {
      await Token.query().where('user_id', user.id).delete()
      throw new CustomException(formatMessage('auth.jwt_invalid'), StatusCodes.UNAUTHORIZED)
    }
  }
}

module.exports = Jwt
