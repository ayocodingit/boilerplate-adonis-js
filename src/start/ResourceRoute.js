'use strict'

const Route = use('Route')

module.exports = (path, controller, validator) => {
  return Route.resource(path, controller)
    .apiOnly()
    .validator(new Map(validator))
}
