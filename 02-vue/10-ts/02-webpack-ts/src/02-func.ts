// 必须参数
function greeting(person: string): string {
  return "Hello, " + person;
}
greeting("tom");

// 可选参数
function greeting1(person: string, msg?: string): string {
  return "Hello, " + person;
}

// 默认值
function greeting2(person: string, msg = ""): string {
  return "Hello, " + person;
}

// 函数重载:先声明，再实现
// 重载1
function watch(cb1: () => {}): void;

//重载2
function watch(cb1: () => {}, cb2: (v1: any, v2: any) => void): void;

// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
  if (cb1 && cb2) {
    console.log("执行watch重载2");
  } else {
    console.log("执行watch重载1");
  }
}
