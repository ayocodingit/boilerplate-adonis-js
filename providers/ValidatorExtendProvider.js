'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ValidatorExtendProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.Database = use('Database')
    this.Validator = use('Validator')
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
    this.exists()
  }

  exists () {
    const existsFn = async (data, field, message, args, get) => {
      const value = get(data, field)
      if (!value) {
        /**
         * skip validation if value is not defined. `required` rule
         * should take care of it.
         */
        return
      }

      const [table, column] = args
      const row = await this.Database.table(table).where(column, value).first()

      if (!row) {
        throw message
      }
    }

    this.Validator.extend('exists', existsFn)
  }
}

module.exports = ValidatorExtendProvider
