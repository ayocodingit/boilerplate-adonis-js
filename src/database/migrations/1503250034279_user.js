'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.uuid('id').primary().notNullable().index()
      table.string('email', 30).notNullable().unique()
      table.string('username', 30).notNullable()
      table.string('role', 30)
      table.string('password', 255).notNullable()
      table.string('avatar', 255)
      table.string('oauth_code', 30).unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
