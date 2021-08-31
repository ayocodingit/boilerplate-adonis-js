'use strict'

const wheres = use('utils/Wheres')

class WhereCustom {
  register (Model) {
    wheres(Model)
  }
}

module.exports = WhereCustom
