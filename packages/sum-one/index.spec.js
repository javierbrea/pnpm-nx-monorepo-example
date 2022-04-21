const sumOne = require("./index");

describe("sumOne", () => {
  it("should sum one to the given number", () => {
    expect(sumOne(2)).toEqual(3);
  });
});
