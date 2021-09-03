'use strict'

const { v4: uuidv4 } = require('uuid')

const UuidHook = exports = module.exports = {}

UuidHook.generate = async (modelInstance) => {
  modelInstance.primaryKeyValue = uuidv4()
}
