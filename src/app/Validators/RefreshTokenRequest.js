'use strict'

const Validator = use('utils/Validator')

class RefreshTokenRequest extends Validator {
  get rules () {
    return {
      refresh_token: 'required'
    }
  }
}

module.exports = RefreshTokenRequest
