'use strict'

const Env = use('Env')

const convertBuffer = (secret) => {
  if (Env.get('JWT_ALGORITHM') === 'RS256') {
    return Buffer.from(secret, 'base64').toString().replace(/\\n/g, '\n')
  }

  return secret
}

module.exports = {
  convertBuffer
}
