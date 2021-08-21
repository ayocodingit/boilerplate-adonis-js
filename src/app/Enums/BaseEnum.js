'use strict'

const Enum = require('enum')

class BaseEnum {
  constructor (enums) {
    this.enum = new Enum(enums)
  }

  getArray (option) {
    const enums = []
    this.enum.enums.forEach(function (enumItem) {
      enums.push(enumItem[option])
    })

    return enums
  }
}

module.exports = BaseEnum
