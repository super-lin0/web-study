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
