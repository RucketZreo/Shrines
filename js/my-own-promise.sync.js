'use strict';

const HANDLES = Symbol('handles');
const FULFILLED = Symbol('fulfilled');
const REJECTED = Symbol('rejected');
const STATE = Symbol('state');
const RESULT = Symbol('result');

const ONRESOLVEDCALLBACK = Symbol('onResolvedCallback');
const ONREJECTEDCALLBACK = Symbol('onRejectedCallback');

function MyPromise(executor) {
  this[STATE] = 'pending';
  this[RESULT];
  this[ONRESOLVEDCALLBACK] = [];
  this[ONREJECTEDCALLBACK] = [];
  function resolve(val) {
    if (this[STATE] == 'pending') {
      this[RESULT] = val;
      this[STATE] = 'fulfilled';
      for (let next of this[ONRESOLVEDCALLBACK]) {
        next(val);
      }
    }
  }

  function reject(err) {
    if (this[STATE] == 'pending') {
      this[RESULT] = err;
      this[STATE] = 'rejected';
      for (let next of this[ONREJECTEDCALLBACK]) {
        next(err);
      }
    }
  }
  try {
    executor(resolve.bind(this), reject.bind(this));
  } catch(err) {
    reject(err);
  }
}

function handleMyPromise(resolve, reject) {
  if (this instanceof MyPromise) {
    this.then(resolve, reject);
  }
}

function executorBuilder(handler) {
  return function (resolve, reject) {
    try {
      let res = handler();
      handleMyPromise.apply(res, [resolve, reject]);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  }
}

function executorPendingBuilder(onResolve, onReject) {
  const ctx = this;
  return function (resolve, reject) {
    ctx[ONRESOLVEDCALLBACK].push(callbackBuilder(onResolve, resolve, reject));
    ctx[ONREJECTEDCALLBACK].push(callbackBuilder(onReject, resolve, reject));
  }
}

function callbackBuilder(handler, resolve, reject) {
  return function (state) {
    try {
      let res = handler(state);
      handleMyPromise.apply(res, [resolve, reject]);
    } catch(err) {
      reject(err);
    }
  }
}

MyPromise.prototype.then = function(_onResolve, _onReject) {
  const onResolve = typeof _onResolve === 'function' ? _onResolve.bind(null, this[RESULT]) : val => val;
  const onReject = typeof _onReject === 'function' ? _onReject.bind(null, this[RESULT]) : reason => reason;
  if (this[STATE] == 'fulfilled') {
    return new MyPromise(executorBuilder(onResolve));
  }
  if (this[STATE] == 'rejected') {
    return new MyPromise(executorBuilder(onReject));
  }
  if (this[STATE] == 'pending') {
    return new MyPromise(executorPendingBuilder.apply(this, [_onResolve, _onReject]));
  }
}

MyPromise.prototype.catch = function(reason) {
  return this.then(null, reason);
}

let resolver = new MyPromise(resolve => {
  resolve(1);
}).then(e => {
  console.log('e', e);
  return 2;
}).then(e => {
  console.log('e', e);
});

let err = new MyPromise((undefined, reject) => {
  reject(1);
}).catch(err => {
  console.log('err', err);
});


let thenable = new MyPromise(resolve => {
  setTimeout(function () {
    resolve(1);
    console.log('resolve 1');
  }, 5000);
})

thenable.then(function a(val) {
  console.log('a val', val);
  return val;
});
thenable.then(function b(val) {
  console.log('b val', val);
  return val;
});
