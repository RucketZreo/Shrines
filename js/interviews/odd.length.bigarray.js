'use strict';

const QUESTION_DESCRIPTION = `
// CONTEXT: Given AN ODD LENGTH POSTIVE INT ELEMENT ARRAY SEQUENCE
// Q: TO FIND SINGLE NUMBER
// LIMITE: TIMESPACE O(n), SPACE O(1)
// NOTE: SUPPORT LARGE OF ODD LENGTH
`;
function show_question() {
  console.log(QUESTION_DESCRIPTION);
}
const arr = [1, 1, 5, 9, 9, 10, 10];
let singluar = arr.reduce((res, cur) => {
  return res ^= cur;
});

console.log(`singluar number in [${arr}], %d`, singluar);
