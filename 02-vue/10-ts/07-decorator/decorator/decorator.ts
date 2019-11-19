//类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
function log(target: Function) {
  // target是构造函数
  console.log(target === Foo); // true
  target.prototype.log = function() {
    console.log(this.bar);
  };
  // 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
}

// target是类实例，name是方法名
function dong(target: any, name: string, descriptor: any) {
  // 这里通过修改descriptor.value扩展了bar方法
  const baz = descriptor.value; //  被装饰的原始方法
  descriptor.value = function(val: string) {
    console.log("dong~~");
    baz.call(this, val);
  };
  return descriptor;
}

function mua(target: any, name: string) {
  target[name] = "mua~~~";
}

// function mua(param:string) {
//   return function (target, name) {
//       target[name] = param
//   }
// }

@log
class Foo {
  bar = "bar";

  @mua
  ns!: string;

  @dong
  setBar(val: string) {
    this.bar = val;
  }
}
const foo = new Foo();
// @ts-ignore
foo.log();

foo.setBar("lalala");

console.log(foo.ns);
