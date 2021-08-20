'use strict'

const Env = use('Env')

module.exports = {
  google: {
    clientId: Env.get('GOOGLE_CLIENT_ID')
  }
}
