'use strict';

function bubble_sort(arr) {
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr.length - i - 1; ++j) {
      if (arr[j] > arr[j+1]) swap(arr, j, j+1);
    }
  }
  return arr;
}

function swap(arr, a, b) {
  let c = arr[a];
  arr[a] = arr[b];
  arr[b] = c;
}

const arr = require('./__test__').generateArray();
console.log("ord   : %s", arr);
console.log("sorted: %s", bubble_sort(arr));
