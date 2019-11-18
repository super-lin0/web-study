// 不用范性
// interface Result {
//   ok: 0 | 1;
//   data: Feature[];
// }

// 使用范性
interface Result<T> {
  ok: 0 | 1;
  data: T;
}

// 范性方法
function getResult<T>(data: T): Result<T> {
  return { ok: 1, data };
}

// 用尖括号指定T为string
getResult<string>("hello");

// 使用类型推断
getResult(1);

// 进一步约束类型变量
interface Foo {
  foo: string;
}

// 约束T必须兼容Foo
function gretting<T extends Foo>(data: T): Result<T> {
  return { ok: 1, data: { foo: "sss" } as T };
}

console.log(gretting({ foo: "aa" }));

function identity(arg: number): number {
  return 1;
}
