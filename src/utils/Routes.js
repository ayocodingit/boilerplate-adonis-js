'use strict'

const Route = use('Route')

const Resource = (path, controller, validator) => {
  return Route.resource(path, controller)
    .apiOnly()
    .validator(new Map(validator))
}

module.exports = { Resource }
