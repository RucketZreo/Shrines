'use strict';
module.exports = { async_machine };

function run({value, done}) {
  if (done) return value;
  else {
    value.then(_value => {
      return run.call(this, this.next(_value));
    });
  }
}

function async_machine(fn) {
  const gen = fn();
  return run.call(gen, gen.next());
}


async_machine(function *() {
  for (let i = 0; i < 10; i++) {
    yield new Promise(next => doExe(i, next));
  }
});


function doExe(n, callback) {
  setTimeout(function () {
    console.log(n);
    if (callback) callback();
  }, 100 * Math.random());
}
