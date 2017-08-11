'use strict';
Array.prototype.flatten = function() {
  var new_array = new_array || [];
  while (this.length) {
    let e = this.shift();
    if (Array.isArray(e)) {
      new_array = new_array.concat(e.flatten());
    }
    else {
      new_array = new_array.concat(e);
    }
  }
  return new_array;
}

const a = [1, 2, [3, 4, [5, 6, [1, 8]]]];
console.log("flatten", a.flatten());
