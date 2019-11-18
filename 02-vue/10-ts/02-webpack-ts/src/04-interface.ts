// 接口：约束结构，类似于type
interface Person {
  firstName: string;
  lastName: string;
}

interface Human extends Person {
  fullname: string;
}

function greeting(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

greeting({ firstName: "Jane", lastName: "User" }); // 正确
// greeting({ firstName: "Jane" }); // 错误
