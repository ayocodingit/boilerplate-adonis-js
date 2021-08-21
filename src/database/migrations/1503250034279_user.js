'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.bigIncrements()
      table.string('email', 30).notNullable().unique()
      table.string('username', 30).notNullable().unique()
      table.string('role', 30)
      table.string('password', 255).notNullable()
      table.string('avatar', 255)
      table.string('oauth_code', 30)
      table.bigInteger('company_profile_id').index()
      table.bigInteger('applicant_id').index()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
