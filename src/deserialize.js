const immutable = require('immutable')
const BigNumber = require('bignumber.js/bignumber.js');

function deserialize(json, options = {}) {
  return JSON.parse(json, (key, value) => {
    return revive(key, value, options)
  })
}


function revive(key, value, options) {
  if (typeof value === 'object' && value) {
    if (value['__record']) {
      return reviveRecord(key, value, options)
    } else if (value['__iterable']) {
      return reviveIterable(key, value, options)
    } else if (value['__date']) {
      return new Date(value['__date'])
    } else if (value['__regexp']) {
      const regExpParts = value['__regexp'].split('/')
      return new RegExp(regExpParts[1], regExpParts[2])
    } else if (value['__bignumber']) {
      return new BigNumber(value['__bignumber']);
    }
  }
  return value
}


function reviveRecord(key, recInfo, options) {
  const RecordType = options.recordTypes[recInfo['__record']]
  if (!RecordType) {
    throw new Error(`Unknown record type: ${recInfo['__record']}`)
  }

  let revivedData = revive(key, recInfo['data'], options)
  if (typeof RecordType.migrate === 'function') {
    revivedData = RecordType.migrate(revivedData)
  }

  return new RecordType(revivedData)
}


function reviveIterable(key, iterInfo, options) {
  switch (iterInfo['__iterable']) {
  case 'List':
    return immutable.List(revive(key, iterInfo['data'], options))

  case 'Set':
    return immutable.Set(revive(key, iterInfo['data'], options))

  case 'OrderedSet':
    return immutable.OrderedSet(revive(key, iterInfo['data'], options))

  case 'Stack':
    return immutable.Stack(revive(key, iterInfo['data'], options))

  case 'Map':
    return immutable.Map(revive(key, iterInfo['data'], options))

  case 'OrderedMap':
    return immutable.OrderedMap(revive(key, iterInfo['data'], options))

  default:
    throw new Error(`Unknown iterable type: ${iterInfo['__iterable']}`)
  }
}


module.exports = {
  deserialize,
}
