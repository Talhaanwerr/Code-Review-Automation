const { square } = require("./functions");

const test = () => {
  const num = 5;
  const sq = square(5);
  const sq2 = num * num;
  console.log(`Square of ${num} is ${sq}`);
};

test();
