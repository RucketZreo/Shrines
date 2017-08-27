'use strict';
function insert_sort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j >= 0; --j) {
      if (arr[j-1] > arr[j]) swap(arr, j-1, j);
    }
  }
  return arr;
}

function swap(arr, a, b) {
  let c = arr[a];
  arr[a] = arr[b];
  arr[b] = c;
}

const arr = require("./__test__").generateArray();
console.log("ord   : %s", arr);
console.log("sorted: %s", insert_sort(arr));
