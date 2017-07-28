'use strict';

const HANDLES = Symbol('HANDLES');
const DICT = Symbol('__dict__');

function MySyncEventEmitter() {
  this[HANDLES] = {};
  this[DICT] = {};
}

MySyncEventEmitter.prototype.on = function (_message, fn) {
  const message = Symbol.for(_message);
  this[HANDLES][message] = this[HANDLES][message] || [];
  this[HANDLES][message].push(fn);
}

MySyncEventEmitter.prototype.emit = function (_message, args) {
  const message = Symbol.for(_message);
  this[HANDLES][message].forEach(_handle => _handle(args));
}

MySyncEventEmitter.prototype.close = function (_message) {
  const message = Symbol.for(_message);
  this[HANDLES][message] = [];
}

let u = new MySyncEventEmitter();
u.on('message', function (args) {
  console.log('a', args);
});
u.on('message', function (args) {
  console.log('b', args);
});

u.emit('message', 'a');
u.emit('message', 'b');
u.emit('message', 'c');
u.close('message');
u.emit('message', 'd');
