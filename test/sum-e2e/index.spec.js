const sumTwo = require("sum-two");
const sumOne = require("sum-one");

describe("When using sumOne and sumTwo", () => {
  it("should sum three to the given number", () => {
    expect(sumOne(sumTwo(4))).toEqual(7);
  });
});
