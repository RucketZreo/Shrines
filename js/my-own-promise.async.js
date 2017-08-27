'use strict';
function resolver(val) {
  if (val.__proto__ == MyOwnPromise.prototype) {
    return val.then(resolver.bind(this), rejecter.bind(this));
  }
  routine.call(null, function () {
    if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.res = val;
        for (var i = 0; i < this._fulfilled_handlers.length; i++) {
          this._fulfilled_handlers[i](val);
        }
    }
  }.bind(this));
}

function rejecter(val) {
  routine.call(null, function () {
    if (this.state === 'pending') {
        this.state = 'rejected';
        this.res = val;
        for (var i = 0; i < this._rejected_handlers.length; i++) {
          this._rejected_handlers[i](val);
        }
    }
  }.bind(this));
}

function resolveMyOwnPromise(next, x, resolve, reject) {
  var then;
  var thenCalledOrThrow = false;

  if (next === x)
    return reject(new TypeError("Chaining cycle detected for promise!"));
  if (x.__proto__ === MyOwnPromise.prototype) {
    if (x.status === 'pending')
      x.then(function (v) {
        resolveMyOwnPromise(next, v, resolve, reject);
      }, reject);
    else
      x.then(resolve, reject);
  }
  else if ((x !== null) && ['function', 'object'].includes(typeof x)) {
    try {
      then = x.then;
      if (typeof then === 'function') {
        then.call(x, function rs(y) {
          if (thenCalledOrThrow) return;
          thenCalledOrThrow = true;
          return resolveMyOwnPromise(next, y, resolve, reject);
        }, function rj(r) {
          if (thenCalledOrThrow) return;
          thenCalledOrThrow = true;
          return reject(y);
        })
      }
    } catch(e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true;
      return reject(e);
    }
  }
  else {
    resolve(x);
  }
}

function MyOwnPromise( executor ) {
  const ctx = this;
  ctx.state = 'pending';
  ctx._fulfilled_handlers = [];
  ctx._rejected_handlers = [];
  ctx.res;

  try {
    executor(resolver.bind(ctx), rejecter.bind(ctx));
  } catch(err) {
    rejecter.bind(ctx)(err);
  }

  ctx.then = function(onFulfilled, onRejected) {
    var next;
    onFulfilled = (typeof onFulfilled === 'function') ? onFulfilled : function (val) { return val };
    onRejected = (typeof onRejected === 'function') ? onRejected: function (reason) { throw reason };
    if (ctx.state === 'fulfilled') {
      return next = new MyOwnPromise(function (resolver, rejecter) {
        try {
          this.res = onFulfilled(ctx.res);
          resolveMyOwnPromise(next, this.res, resolver, rejecter);
        } catch (err) {
          rejecter(err);
        }
      });
    }
    if (ctx.state === 'rejected') {
      return next = new MyOwnPromise(function (resolver, rejecter) {
        try {
          this.res = onRejected(ctx.res);
          resolveMyOwnPromise(next, this.res, resolver, rejecter);
        } catch (err) {
          rejecter(err);
        }
      });
    }
    if (ctx.state === 'pending') {
      return next = new MyOwnPromise(function (resolver, rejecter) {
        ctx._fulfilled_handlers.push(function (val) {
          try {
            var x = onFulfilled(val);
            resolveMyOwnPromise(next, x, resolver, rejecter);
          } catch(err) {
            rejecter(err);
          }
        });
        ctx._rejected_handlers.push(function (val) {
          try {
            var x = onRejected(val);
            resolveMyOwnPromise(next, x, resolver, rejecter);
          } catch(err) {
            rejecter(err);
          }
        });
      });
    }
  }
}

var asyncer = setTimeout;
function routine(fn) {
  asyncer.call(this, () => {
    fn();
  });
}

const fs = require('fs');
let a = new MyOwnPromise((resolve, reject) => {
  fs.readFile('./my-own-promise.async.js', 'utf-8', function (err, data) {
    if (err) {
      console.log('err', err);
      reject(err);
    }
    console.log('data');
    resolve(data);
  });
}).then(e => {
  console.log('inspect e', Object.prototype.toString.call(e));
  console.log('a');
});

let y = new MyOwnPromise(function executor(resolve, reject) {
  console.log('y');
  resolve(new MyOwnPromise(resolve => resolve(1)));
}).then().then().then().then().then(x => {
  console.log('y is %d', x);
})
