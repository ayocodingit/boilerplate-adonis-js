'use strict'

const Enum = require('enum')

class BaseEnum {
  constructor (enums) {
    this.enum = new Enum(enums)
  }

  getValues () {
    const values = []
    this.enum.enums.forEach(function (enumItem) {
      values.push(enumItem.value)
    })

    return values
  }

  getKeys () {
    const keys = []
    this.enum.enums.forEach(function (enumItem) {
      keys.push(enumItem.key)
    })

    return keys
  }
}

module.exports = BaseEnum
