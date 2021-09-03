'use strict'

const Queries = use('utils/Queries')

class Query {
  register (Model) {
    Queries(Model)
  }
}

module.exports = Query
