'use strict'

const Enums = require('enum')

class Enum {
  #items;
  #enums;

  constructor (enums) {
    this.#items = new Enums(enums)
    this.#enums = this.#items.enums
    this.#setKeyValue()
  }

  #setKeyValue () {
    this.#enums.forEach(enumItem => {
      this[enumItem.key] = {
        value: enumItem.value,
        key: enumItem.key
      }
    })
  }

  #getArray (option) {
    const items = []
    this.#enums.forEach(function (enumItem) {
      items.push(enumItem[option])
    })

    return items
  }

  get enum () {
    return this.#items
  }

  get values () {
    return this.#getArray('value')
  }

  get keys () {
    return this.#getArray('key')
  }

  get valuesString () {
    return this.values.toString()
  }

  get valuesStringWithSpace () {
    return this.values.join(', ')
  }
}

module.exports = Enum
