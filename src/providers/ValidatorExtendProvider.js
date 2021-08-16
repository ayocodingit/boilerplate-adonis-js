'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const Exists = require('./validator/Exists')

class ValidatorExtendProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const Database = use('Database')
    const Validator = use('Validator')

    Exists(Database, Validator)
  }
}

module.exports = ValidatorExtendProvider
