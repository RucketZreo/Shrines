
function asyncLoop(arr) {
  if (arr.length < 1) return arr[0];
  return new Promise(resolve => {
    resolve(arr[0]);
    arr.shift();
    asyncLoop(arr);
  }).then(value => {
    console.log(value);
  });
}
function asyncReducer(arr, reduce) {
  return new Promise(resolve => {
    return _reducer(arr, reduce).then(e => {
      resolve(e);
    });
  });
}
function _reducer(arr, reduce) {
  if (arr.length < 1) return ;
  return new Promise(resolve => {
    resolve(arr[0].then(data => {
      reduce.val += data;
      _reducer(arr.slice(1), reduce);
      return reduce;
    }));
  }).then(value => {
    return value;
  });
}

let n = {val: 0};
const promisesA = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3), Promise.resolve(4)];
const promisesB = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3), Promise.resolve(4)];
new Promise( next => {
  console.log('--------------------------');
  console.log('async loop');
  console.log('--------------------------');
  asyncLoop(promisesA).then( _ => {
    next();
  });
}).then(e => {
  console.log('--------------------------');
  console.log('async reducer');
  console.log('--------------------------');
  asyncReducer(promisesB, n).then(val => {
    console.log("val", val);
  });
});
