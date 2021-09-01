const Config = use('Config')
const { OAuth2Client } = require('google-auth-library')
const { StatusCodes } = require('http-status-codes')
const CustomException = use('App/Exceptions/CustomException')
const googleClientId = Config.get('service.google.clientId')
const googleClientSecret = Config.get('service.google.clientSecret')
const googleClient = new OAuth2Client(googleClientId, googleClientSecret)

const getTokenInfoGoogle = async (request) => {
  try {
    const payload = request.only(['code', 'redirect_uri'])
    payload.codeVerifier = request.input('code_verifier')
    const { tokens } = await googleClient.getToken(payload)
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token
    })
    return ticket.getPayload()
  } catch (error) {
    console.log(error.message)
    throw new CustomException(error.message, StatusCodes.UNAUTHORIZED)
  }
}

module.exports = {
  getTokenInfoGoogle
}
