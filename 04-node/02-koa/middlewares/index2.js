async function fn1(next) {
  console.log("fn1");
  await next();
  console.log("end fn1");
}

async function fn2(next) {
  console.log("fn2");
  await delay();
  await next();
  console.log("end fn2");
}

function fn3(next) {
  console.log("fn3");
}

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

function compose(middlewares) {
  console.log("compose start");

  return function() {
    console.log("匿名函数开始");
    console.log("执行dispatch 0");

    return dispatch(0);
    function dispatch(i) {
      console.log("进入dispatch方法，参数", i);

      let fn = middlewares[i];

      console.log("获取fn,此时fn为", fn);

      if (!fn) {
        console.log("fn为空的情况");

        return Promise.resolve();
      }

      console.log("fn不为空的情况");

      return Promise.resolve(
        fn(function next() {
          console.log("进入next方法，参数为", i);

          return dispatch(i + 1);
        })
      );
    }
  };
}

const middlewares = [fn1, fn2, fn3];

const finalFn = compose(middlewares);

finalFn();
