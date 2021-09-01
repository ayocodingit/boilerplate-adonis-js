'use strict'

const wheres = use('utils/Wheres')

class Where {
  register (Model) {
    wheres(Model)
  }
}

module.exports = Where
