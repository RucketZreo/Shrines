'use strict';

function isFunction(val) {
  if (!val) return false;
  return ((typeof val === 'function') ? true : false)
}
function call(fn, ctx, ...args) {
  if (!isFunction(fn)) {
    throw Error(`The first argument ${fn} should be valid Function Object`);
  }
  fn.prototype = ctx;
  return new fn(...args);
}

function hello(a, b) {
  if (this.name) {
    console.log('change context by call');
    console.log('name', this.name);
  } else {
    console.log('use odd context');
  }
  console.log('a is ', a);
  console.log('b is ', b);
}

function hola(a, b) {
  if (this.property) {
    console.log('change context by call');
    console.log('property', this.property);
  } else {
    console.log('use odd context');
  }
  console.log('a is ', a);
  console.log('b is ', b);
}

call(hello, {
  name: 'world'
}, 'Flash', 'Green Arrow');

call(hola, {
  property: 'SpiderMan'
}, 'Batman', 'Badman');
