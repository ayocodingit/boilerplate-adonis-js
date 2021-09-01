'use scrict'

const when = (Model) => {
  Model.queryMacro('when', function (value, callback) {
    if (value) {
      const query = this
      callback(query)
    }
    return this
  })
}

const whereBy = (Model) => {
  Model.queryMacro('whereBy', function (key, value) {
    this.when(value, query => {
      query.where(key, value)
    })
    return this
  })
  Model.queryMacro('orWhereBy', function (key, value) {
    this.when(value, query => {
      query.orWhere(key, value)
    })
    return this
  })
}

const whereDate = (Model) => {
  Model.queryMacro('whereDate', function (key, value, operator = '=') {
    this.when(value, query => {
      query.whereRaw(`DATE(${key}) ${operator} ?`, [value])
    })
    return this
  })
  Model.queryMacro('whereDateBetween', function (key, value) {
    this.when(typeof value === Array && value.length === 2, query => {
      query.whereRaw(`DATE(${key}) BETWEEN ? AND ?`, value)
    })
    return this
  })
}

const whereHas = (Model) => {
  Model.queryMacro('whereHasBy', function (relation, key, value) {
    this.when(value, query => {
      query.whereHas(relation, query => {
        query.where(key, value)
      })
    })
    return this
  })
  Model.queryMacro('orWhereHasBy', function (relation, key, value) {
    this.when(value, query => {
      query.orWhereHas(relation, query => {
        query.where(key, value)
      })
    })
    return this
  })
}

module.exports = (Model) => {
  when(Model)
  whereBy(Model)
  whereDate(Model)
  whereHas(Model)
}
