import it from 'ava'

import helpers from './_helpers'
const BigNumber = require('bignumber.js/bignumber.js');


it('should serialize a big number value', (test) => {
  const data = {
    '__bignumber': '1234567890',
  }

  let bignumber = helpers.getDeserializationResult(data)
  test.is(BigNumber.isBigNumber(bignumber), true);
})

