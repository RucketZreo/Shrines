'use strict';

function swap(arr, a, b) {
  let c = arr[a];
  arr[a] = arr[b];
  arr[b] = c;
}
function heap_sort(arr) {
  build_heap(arr);
  for (let i = arr.length - 1; i >= 0; --i) {
    swap(arr, 0, i);
    max_heapify(arr, 0, i);
  }
}

function build_heap(arr) {
  for (let i = Math.floor(arr.length / 2); i >= 0; --i) {
    max_heapify(arr, i, arr.length);
  }
}

function max_heapify(arr, i, heapsize) {
  let l = 2 * i + 1;
  let r = l + 1;
  let max = i;
  if (l < heapsize && arr[l] > arr[max])
    max = l;
  if (r < heapsize && arr[r] > arr[max])
    max = r;
  if (max !== i) {
    swap(arr, max, i);
    max_heapify(arr, max, heapsize);
  }
}

const arr = require('./__test__').generateArray();
console.log("ord   : %s", arr);
heap_sort(arr);
console.log("sorted: %s", arr);
