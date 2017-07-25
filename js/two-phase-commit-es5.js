'use strict';

class Transaction {
  constructor() {
    this._beforeHandler = [];
    this._afterHandler = [];
    this._retry = 5;
  }

  static before(proc) {
    if ( !(proc.call && typeof proc === 'function') ) throw new Error(`${proc.constructor.name} must be a function`);
    this._beforeHandle.push(proc);
  }

  static after(proc) {
    if ( !(proc.call && typeof proc === 'function') ) throw new Error(`${proc.constructor.name} must be a function`);
    this._afterHandle.push(proc);
  }

  before() {
    return Promise.all(this._beforeHandler)
      .then(res => res)
      .catch(err => err);
  }

  after() {
    return Promise.all(this._afterHandler)
      .then(res => res)
      .catch(err => err);
  }

  run(proc) {
    const ctx = this;
    return new Promise(resolve, reject) {
      ctx.before(resolve).then(next => {
        next(proc());
      }).then(next => {
        next(ctx.after());
      }).catch(err => err);
    };
  }
}

module.exports = Transaction();
