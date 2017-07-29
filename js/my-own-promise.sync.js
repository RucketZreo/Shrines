'use strict';

const HANDLES = Symbol('handles');
const FULFILLED = Symbol('fulfilled');
const REJECTED = Symbol('rejected');
const STATE = Symbol('state');
const COMMAND = Symbol('command');
const RESULT = Symbol('result');

function isFunction(args) {
  if (args && typeof args == 'function') return true;
}
function MyPromise(executor) {
  if (!isFunction(resolve)) throw Error(`${resolve} is not function`);
  this[STATE] = 'pending';
  this[RESULT];
  function resolve(val) {
    if (this[STATE] == 'pending') {
      this[RESULT] = val;
      this[STATE] = 'fulfilled';
    }
  }

  function reject(err) {
    if (this[STATE] == 'rejected') {
      this[RESULT] = err;
      this[STATE] = 'rejected';
    }
  }
  executor(resolve.bind(this), reject.bind(this));
}

MyPromise.prototype.then = function(_resolve, _reject) {
  let newRoutine;
  _resolve = typeof _resolve === 'function' ? _resolve : function(val) {}
  _reject = typeof _reject === 'function' ? _reject : function(reason) {}
  if (this[STATE] == 'fulfilled') {
    return new MyPromise(function(resolve, reject) {
      try {
        let res = _resolve();
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }
  if (this[STATE] == 'rejected') {
    return new MyPromise(function() {
      try {
        let res = _reject();
        resolve(res);
      } catch(err) {
        reject(err);
      }
    });
  }
  if (this[STATE] == 'pending') {
    return new MyPromise(function() {
      // TODO: collection pending callback
    });
  }
}
