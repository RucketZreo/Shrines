'use strict';
module.exports = {
  generateArray( size = 10 ) {
    const arr = [];
    while (size--)
      arr.push(Math.floor(Math.random() * 10 + 1));
    return arr;
  }
};
