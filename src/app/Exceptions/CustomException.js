'use strict'

const CustomException = (message, code) => {
  return {
    code: code,
    message: message
  }
}

module.exports = CustomException
