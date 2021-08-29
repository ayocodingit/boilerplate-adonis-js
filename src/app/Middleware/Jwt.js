'use strict'

const Antl = use('Antl')
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
      await this.checkTokenInvalid(token)
      await next()
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async checkTokenInvalid (token) {
    if (!token) {
      throw new CustomException(Antl.formatMessage('auth.jwt_invalid'), StatusCodes.UNAUTHORIZED)
    }
    if (token.is_revoked) {
      await token.delete()
      throw new CustomException(Antl.formatMessage('auth.jwt_invalid'), StatusCodes.UNAUTHORIZED)
    }
  }
}

module.exports = Jwt
