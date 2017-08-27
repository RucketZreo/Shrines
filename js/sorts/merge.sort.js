'use strict';
function merge_sort(arr) {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  return merge(merge_sort(arr.slice(0, mid)), merge_sort(arr.slice(mid)));
}

function merge(left, right) {
  const sorted_arr = [];
  while (left.length && right.length) {
    sorted_arr.push( left[0] < right[0] ? left.shift() : right.shift() );
  }
  return sorted_arr.concat(left).concat(right);
}

function swap(arr, a, b) {
  let c = arr[a];
  arr[a] = arr[b];
  arr[b] = c;
}

const arr = require("./__test__").generateArray();
console.log("ord   : %s", arr);
console.log("sorted: %s", merge_sort(arr));
