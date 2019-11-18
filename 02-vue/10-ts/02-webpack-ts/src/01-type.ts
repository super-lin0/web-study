let var1: string;
var1 = "aa";

// 类型推断
let var2 = true;

// 原始类型：String\boolean\number\symbol\undefined\null

// 数组
let arr: string[];
arr = ["tom"];

// 任意类型
let varAny: any;
varAny = 1;

// 在函数中类型的约束
function greet(person: string): string {
  return "hello" + person;
}

greet("abc");

function warn(params: void) {}

// 对象类型object,不是原始类型就是对象类型
function fn1(params: object) {}
fn1({ prop: 1 });
// fn1(1) wrong

function fn2(params: { prop: number }) {}
fn2({ prop: 1 });

// 类型别名 type
type Prop = { prop: number };
function fn3(params: Prop) {}

// 类型断言,某些情况下，用户比较确定值的类型，可以直接断言
// 类型断言一般是把比较范的类型断言为更为具体的类型
const someValue: any = "this is string";
const strLen = (someValue as string).length;

// 联合类型
let union: string | number;
union = 1;
union = "ss";

// 交叉类型
type First = { first: number };
type Second = { second: number };
type FirstAndSecond = First & Second;

function fn4(params: FirstAndSecond): FirstAndSecond {
  return { first: 1, second: 2 };
}

fn4({ first: 1, second: 2 });
