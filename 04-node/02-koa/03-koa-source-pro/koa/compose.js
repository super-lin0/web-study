module.exports = function compose(middlewares) {
  console.log("compose start");

  return function(ctx) {
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
        fn(ctx, function next() {
          console.log("进入next方法，参数为 ctx.body:", ctx.body);

          return dispatch(i + 1);
        })
      );
    }
  };
};
