'use strict';

function isFunction(val) {
  if (!val) return false;
  return ((typeof val === 'function') ? true : false)
}

function isNumber(val) {
  if (!val) return false;
  return ((typeof val === 'number') ? true : false)
}

function isBuiltType(val) {
  return val === NaN
}

function isFalsy(val) {
  return ((['', "", {}, undefined, false, null, 0, NaN].includes(val)) ? true : false)
}

function isArrayLike(val) {
  if (isNumber(val)) return false;
  if (isFalsy(val)) return false;
  if (!val.length && !val.size) return false;
  return true;
}

function call(fn, ctx, ...args) {
  if (!isFunction(fn)) {
    throw Error(`The first argument ${fn} should be valid Function Object`);
  }
  fn.prototype = ctx;
  return new fn(...args);
}

function apply(fn, ctx, args) {
  if (!isFunction(fn)) {
    throw Error(`The first argument ${fn} should be valid Function Object`);
  }
  fn.prototype = ctx;
  if ([null, undefined].includes(args)) return new fn();
  if (!isArrayLike(args)) throw Error(`argument: ${args} is not array like object`);
  return new fn(args);
}

if (require.main === module) {
  function hello(a, b) {
    if (this.name) {
      console.log(`change context by ${this.fn}`);
      console.log('name', this.name);
    } else {
      console.log('use odd context');
    }
    console.log('a is ', a);
    console.log('b is ', b);
  }

  function hola(a, b) {
    if (this.property) {
      console.log(`change context by ${this.fn}`);
      console.log('property', this.property);
    } else {
      console.log('use odd context');
    }
    console.log('a is ', a);
    console.log('b is ', b);
  }

  call(hello, {
    name: 'world',
    fn: 'call',
  }, 'Flash', 'Green Arrow');

  call(hola, {
    property: 'SpiderMan',
    fn: 'call',
  }, 'Batman', 'Badman');

  apply(hello, {
    name: 'world',
    fn: 'apply',
  }, ['Flash', 'Green Arrow']);

  apply(hola, {
    property: 'SpiderMan',
    fn: 'apply',
  }, ['Batman', 'Badman']);

  apply(hello, {
    name: 'world',
    fn: 'apply',
  }, undefined);

  apply(hola, {
    property: 'SpiderMan',
    fn: 'apply',
  }, false);
}
