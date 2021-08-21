'use strict'

const Enum = require('enum')

const RoleEnum = new Enum({
  MASYARAKAT: 'masyarakat',
  ADMIN: 'admin',
  MITRA: 'mitra'
})

const getValues = () => {
  const values = []
  RoleEnum.enums.forEach(function (enumItem) {
    values.push(enumItem.value)
  })

  return values
}

const getKeys = () => {
  const keys = []
  RoleEnum.enums.forEach(function (enumItem) {
    keys.push(enumItem.key)
  })

  return keys
}

module.exports = {
  RoleEnum,
  getValues,
  getKeys
}
