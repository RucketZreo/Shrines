'use strict';
function resolver(val) {
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
    onFulfilled = (typeof onFulfilled === 'function') ? onFulfilled : function (val) { return val };
    onRejected = (typeof onRejected === 'function') ? onRejected: function (reason) { throw reason };
    if (ctx.state === 'fulfilled') {
      return new MyOwnPromise(function (resolver, rejecter) {
        try {
          this.res = onFulfilled(ctx.res);
          resolver(this.res);
        } catch (err) {
          rejecter(err);
        }
      });
    }
    if (ctx.state === 'rejected') {
      return new MyOwnPromise(function (resolver, rejecter) {
        try {
          this.res = onRejected(ctx.res);
          rejecter(this.res);
        } catch (err) {
          rejecter(err);
        }
      });
    }
    if (ctx.state === 'pending') {
      return new MyOwnPromise(function (resolver, rejecter) {
        ctx._fulfilled_handlers.push(function (val) {
          try {
            onFulfilled(val);
          } catch(err) {
            onRejected(err);
          }
        });
        ctx._rejected_handlers.push(function (val) {
          try {
            onRejected(val);
          } catch(err) {
            onRejected(err);
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
