'use strict';
function swap(arr, a, b) {
  let c = arr[a];
  arr[a] = arr[b];
  arr[b] = c;
}

function select_sort(arr) {
  for(let i = 0; i < arr.length; ++i) {
    let min = i;
    for (let j = i; j < arr.length; ++j) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i)
      swap(arr, min, i);
  }
  return arr;
}

const arr = require("./__test__").generateArray();
console.log("ord   : %s", arr);
console.log("sorted: %s", select_sort(arr));
