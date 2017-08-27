'use strict';

function bucket_sort(arr) {
  const bucket = [];
  for (let key of arr) {
    bucket[key] = (!bucket[key]) ? 1 : bucket[key] + 1;
  }
  const sorted_arr = [];
  for (let i = 0; i < bucket.length; ++i) {
    while (bucket[i]--) sorted_arr.push(i);
  }
  return sorted_arr;
}

const arr = require("./__test__").generateArray();
console.log("ord   : %s", arr);
console.log("sorted: %s", bucket_sort(arr));
