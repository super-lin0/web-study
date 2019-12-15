const Person = {
  info: { name: "zhangsan" },
  get name() {
    return this.info.name;
  },
  set name(val) {
    console.log(`setter name:${val}`);

    this.info.name = `【${val}】`;
  }
};

console.log(`getter name:${Person.name}`);

Person.name = "lisi";

console.log(`getter name:${Person.name}`);
