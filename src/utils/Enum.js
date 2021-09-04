'use strict'

const Enums = require('enum')

class Enum {
  #items;
  #enums;

  constructor (enums) {
    this.#items = new Enums(enums, { ignoreCase: true })
    this.#enums = this.#items.enums
    this.#setKeyValue()
  }

  #setKeyValue () {
    this.#enums.forEach(enumItem => {
      this[enumItem.key] = enumItem
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

  get keysString () {
    return this.keys.toString()
  }

  get keysStringWithSpace () {
    return this.keys.join(', ')
  }

  make(value) {
    return this.#items.get(value)
  }

  has(value) {
    return this.#items.has(value)
  }
}

module.exports = Enum
