'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const UserHook = exports = module.exports = {}
const { v4: uuidv4 } = require('uuid')

UserHook.password = async (user) => {
  if (user.dirty.password) {
    user.password = await Hash.make(user.password)
  }
}

UserHook.uuid = async (user) => {
  user.uid = uuidv4()
}
