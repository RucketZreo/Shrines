'use strict';

function MyCurry(fn) {
  const args = [];
  return function curry(_args) {
    args.push(_args);
    curry.valueOf = curry.toString = function() {
      return fn.apply(null, args);
    }
    return curry;
  }
}

const fs = require('fs');
const executor = MyCurry(fs.readFile)('./curry.js')('utf-8')(function (err, data) {
  if (err) throw err;
  console.log('data', data);
});

~executor;
