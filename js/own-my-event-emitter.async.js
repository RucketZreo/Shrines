'use strict';

const DEFAULT_EVENT = Symbol('default_event');
const HANDLES = Symbol('handles');
const INTERVAL_TIMER = Symbol('interval_timer');
const DICT = Symbol('__dict__');

const ENABLE_PULL = Symbol('enable_pull');

function MyEventEmitter () {
  this[HANDLES] = {};
  this[DICT] = {};
  this[INTERVAL_TIMER] = {};
}

MyEventEmitter.prototype[ENABLE_PULL] = function(_message) {
  const message = Symbol.for(_message);
  if (this[HANDLES][message] && this[HANDLES][message].length == 1) {
    this[INTERVAL_TIMER][message] = setInterval(function () {
      while ( this[DICT][message].length ) {
        const _args = this[DICT][message].shift();
        this[HANDLES][message].forEach(
          _handle => _handle(_args)
        );
      }
    }.bind(this));
  }
}

MyEventEmitter.prototype.on = function(message, handle) {
  if (arguments.length != 2)
    throw Error('arguments wrong expect 2, actual', arguments.length);

  this[HANDLES][Symbol.for(message)] = this[HANDLES][Symbol.for(message)] || [];
  this[HANDLES][Symbol.for(message)].push( handle );
  this[ENABLE_PULL](message);
}

MyEventEmitter.prototype.emit = function (message, args) {
  this[DICT][Symbol.for(message)] = this[DICT][Symbol.for(message)] || [];
  this[DICT][Symbol.for(message)].push( args );
}

MyEventEmitter.prototype.close = function (message) {
  delete this[DICT][Symbol.for(message)];
  delete this[HANDLES][Symbol.for(message)];
  delete this[INTERVAL_TIMER][Symbol.for(message)];
}

let a = new MyEventEmitter();
let b = new MyEventEmitter();

b.on('hello', function (args) {
  console.log("1", args);
});

b.on('hello', function (args) {
  console.log("2", args);
});

b.emit('hello', 'a');
b.emit('hello', 'b');
