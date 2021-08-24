'use strict'

const Env = use('Env')

const getBuffer = (secret) => {
  if (Env.get('JWT_ALGORITHM') === 'RS256') {
    return Buffer.from(secret.replace(/\\n/g, '\n'), 'utf8')
  }

  return secret
}

module.exports = {
  getBuffer
}