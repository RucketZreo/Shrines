/*
 * https://techdevguide.withgoogle.com/paths/foundational/find-longest-word-in-dictionary-that-subsequence-of-given-string/#code-challenge
 *
 */

// solution 1
'use strict';

(function solution1() {
  function run(S, D) {
    let max = D[0];
    const seq = S.split('');
    for (let i = 1; i < D.length; ++i) {
      if (is_subsequence_of.call(seq, D[i]) && D[i].length > max.length) {
        max = D[i];
      }
    }
    if (is_subsequence_of.call(seq, max)) return max;
  }

  function is_subsequence_of(src) {
    const S = this;
    let i = 0, j = 0;
    while (i < S.length && j < src.length) {
      if (S[i] === src[j]) {
        ++i;
        ++j;
        continue;
      }
      else {
        ++i;
      }
    }
    if (i === S.length-1) return true;
  }


  let D = ["able", "ale", "apple", "bale", "kangaroo"];

  let S = "abppplee";

  let arr = D.filter((e) => is_subsequence_of.call(S.split(''), e.split('')));

  console.log("solution1 is '%s'", run(S, D));
})();

