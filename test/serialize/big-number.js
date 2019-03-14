import it from 'ava'

import helpers from './_helpers'
const BigNumber = require('bignumber.js');


it('should serialize a big number value', (test) => {
  const result = helpers.getSerializationResult(new BigNumber(123));
  test.is(result['__bignumber'], '123')  

  const result2 = helpers.getSerializationResult(new BigNumber('12345678900'));
  test.is(result2['__bignumber'], '12345678900')  
})

