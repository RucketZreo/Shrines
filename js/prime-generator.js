'use strict';

function isNumber(e) {
  return (e && typeof e == 'number') ? true : false
}

function isPrimeA(num) {
  if (!isNumber(num)) return false;
  for (let i = 2; i < Math.floor(Math.sqrt(num)); i++) {
    if (num % i == 0) return false;
  }
  return true;
}

function isPrimeB(num) {
  if (!isNumber(num)) return false
  // prime at least greater than 1
  if (num <= 1) return false;
  // only one prime is even
  if (num % 2 == 0 && num > 2) return false;
  // find prime from odd
  for (let i = 3; i < Math.floor(num / 2); i += 2) {
    if (num % i == 0) return false;
  }
  return true;
}
console.log('2 is prime', isPrimeA(2));
console.log('2 is prime', isPrimeB(2));
console.log('1049 is prime', isPrimeA(1049));
console.log('1049 is prime', isPrimeB(1049));
