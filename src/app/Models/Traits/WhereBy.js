'use strict'

const _ = require('lodash')

class WhereBy {
  register (Model) {
    const defaultOptions = { useCamelCase: true }
    _.extend({}, { defaultOptions })

    Model.queryMacro('whereBy', function (key, value) {
      if (value) {
        this.where(key, value)
      }
      return this
    })
  }
}

module.exports = WhereBy
