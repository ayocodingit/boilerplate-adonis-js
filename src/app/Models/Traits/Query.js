'use strict'

const Queries = require('adonis-queries')

class Query {
  register (Model) {
    Queries(Model)
  }
}

module.exports = Query
