'use strict'

const Env = use('Env')

const convertBuffer = (secret) => {
  if (Env.get('JWT_ALGORITHM') === 'RS256') {
    return Buffer.from(secret, 'base64').toString().replace(/\\n/g, '\n')
  }

  return secret
}

const jwtConfig = () => {
  const options = {
    algorithm: Env.get('JWT_ALGORITHM', 'HS256'),
    secret: convertBuffer(Env.get('JWT_SECRET', Env.get('APP_KEY'))),
    expiresIn: Number(Env.get('JWT_TTL', 3600))
  }

  if (Env.get('JWT_ALGORITHM') === 'RS256') {
    options.public = convertBuffer(Env.get('JWT_PUBLIC'))
  }
  return options
}

const generateToken = async (auth, user) => {
  const token = await auth.withRefreshToken().generate(user, true)
  return responseToken(user, token)
}

const responseToken = async (user, token) => {
  token.user = user
  return token
}

module.exports = {
  jwtConfig: jwtConfig(),
  generateToken,
  responseToken
}
