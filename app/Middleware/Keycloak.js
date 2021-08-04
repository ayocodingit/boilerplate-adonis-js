'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Config = use('Config')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

class Keycloak {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, session }, next) {
    const keycloakPem = Config.get('keycloak.keycloakPem')
    const jwtConfig = Config.get('keycloak.config')

    try {
      const decoded = jwt.verify(this.getToken(request), keycloakPem, jwtConfig)
      session.put('user', decoded)
      await next()
    } catch (err) {
      session.forget('user')
      return response.status(StatusCodes.UNAUTHORIZED).json({ error: err.message })
    }
  }

  getToken (request) {
    const authorization = request.header('authorization')?.split(' ')

    let token = null
    if (authorization && authorization.length === 2) {
      token = authorization[1]
    }

    return token
  }
}

module.exports = Keycloak
