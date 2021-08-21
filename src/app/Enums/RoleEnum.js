'use strict'

const Enum = require('enum')

const Enums = new Enum({
  MASYARAKAT: 'masyarakat',
  ADMIN: 'admin',
  MITRA: 'mitra'
})

const getValues = () => {
  const values = []
  Enums.enums.forEach(function (enumItem) {
    values.push(enumItem.value)
  })

  return values
}

const getKeys = () => {
  const keys = []
  Enums.enums.forEach(function (enumItem) {
    keys.push(enumItem.key)
  })

  return keys
}

module.exports = {
  Enums,
  getValues,
  getKeys
}
