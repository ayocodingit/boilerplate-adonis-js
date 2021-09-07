'use strict'

const Validator = use('utils/Validator')

class GoogleRequest extends Validator {
  get rules () {
    return {
      code: 'required',
      redirect_uri: 'required|url',
      code_verifier: 'required'
    }
  }
}

module.exports = GoogleRequest
