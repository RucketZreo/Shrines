'use strict';

function swap(arr, a, b) {
  let c = arr[a];
  arr[a] = arr[b];
  arr[b] = c;
}

function quick_sort(arr, l, r) {
  if (l < r) {
    const n = Math.floor(Math.random() * (r - l) + l);
    const pivot = partition(arr, l, r, n);
    quick_sort(arr, l, pivot - 1);
    quick_sort(arr, pivot + 1, r);
  }
}

function partition(arr, l, r, p) {
  let pivot = arr[p];
  swap(arr, p, r);
  let lt = l, i = l;
  while (i <= r-1) {
    if (arr[i] <= pivot)
      swap(arr, lt++, i);
    i++;
  }
  swap(arr, lt, r);
  return lt;
}

const arr = require("./__test__").generateArray();
console.log("ord   : %s", arr);
quick_sort(arr, 0, arr.length-1);
console.log("sorted: %s", arr);
