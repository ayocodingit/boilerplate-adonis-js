'use strict'

const Env = use('Env')

module.exports = {
  config: {
    algorithms: 'RS256'
  },
  keycloakPem: Buffer.from(Env.get('KEYCLOAK_PEM'), 'base64').toString()
}
