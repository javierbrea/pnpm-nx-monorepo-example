const sumOne = require("sum-one");

function sumTwo(number) {
  return sumOne(sumOne(number));
}

module.exports = sumTwo;
