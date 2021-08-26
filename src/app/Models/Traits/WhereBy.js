'use strict'

class WhereBy {
  register (Model) {
    Model.queryMacro('whereBy', function (key, value) {
      if (value) {
        this.where(key, value)
      }
      return this
    })
  }
}

module.exports = WhereBy
