// const add = (x, y) => x + y;
// const square = z => z * z;

// const fn = (x, y) => square(add(x, y));

// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args));
// const composeN = (...[first, ...other]) => (...args) => {
//   let ret = first(...args);

//   other.forEach(fis => {
//     ret = fis(ret);
//   });

//   return ret;
// };

// console.log(composeN(add, square)(1, 2));

async function fn1(next) {
  console.log("fn1");
  await next();
  console.log("end fn1");
}

async function fn2(next) {
  console.log("fn2");
  await delay();
  await next();
  console.log("fn2 end");
}

function fn3() {
  console.log("fn3");
}

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

const compose = middlewares => {
  return function() {
    return dispatch(0);
    function dispatch(i) {
      let fn = middlewares[i];

      if (!fn) {
        return Promise.resolve();
      }

      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1);
        })
      );
    }
  };
};

const middlewares = [fn1, fn2, fn3];

const finalFn = compose(middlewares);

finalFn();
