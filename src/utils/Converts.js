'use strict'

const Env = use('Env')

const convertBuffer = (secret) => {
  if (Env.get('JWT_ALGORITHM') === 'RS256') {
    secret = Buffer.from(secret, 'base64').toString()
    return Buffer.from(secret.replace(/\\n/g, '\n'), 'utf8')
  }

  return secret
}

module.exports = {
  convertBuffer
}
