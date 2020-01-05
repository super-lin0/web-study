// // 类装饰器
// function anotationClass(target) {
//   console.log("======Class Anotation========");
//   console.log("target", target);
// }

// function anotationMethods(target, property, descriptor) {
//   console.log("===============Method Anotation==============");

//   console.log("target:", target);
//   console.log("property:", property);
//   console.log("descriptor:", descriptor);
// }

// @anotationClass
// class Example {
//   @anotationMethods
//   instanceMember(name, age) {}

//   @anotationMethods
//   static staticMethod() {}
// }

// function anotationClass(id) {
//   console.log("anotationClass evaluated ", id);
//   return target => console.log("anotationClass executed", id);
// }

// function anotationMethods(id) {
//   console.log("anotationMethods evaluated", id);
//   return (target, property, descriptor) =>
//     console.log("anotationMethod executed", id);
// }

// @anotationClass(1)
// @anotationClass(2)
// class Example {
//   @anotationMethods(1)
//   @anotationMethods(2)
//   method() {}
// }

function log(target, name, descriptor) {
  const oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling "${name}" with`, arguments);
    return oldValue.apply(null, arguments);
  };

  return descriptor;
}

class Maths {
  @log
  add(a, b) {
    return a + b;
  }
}

const math = new Maths();

math.add(2, 4);
