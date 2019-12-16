const add = (x, y) => x + y;
const square = z => z * z;

// const fn = (x, y) => square(add(x, y));

// const compose = (f1, f2) => (...args) => f2(f1(...args));

const compose = (...[first, ...other]) => (...args) => {
  let ret = first(...args);
  other.forEach(fn => {
    ret = fn(ret);
  });

  return ret;
};

const fn = compose(add, square);

console.log(fn(1, 2));
