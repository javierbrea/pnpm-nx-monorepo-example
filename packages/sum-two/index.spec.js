const sumTwo = require("./index");

describe("sumTwo", () => {
  it("should sum two to the given number", () => {
    expect(sumTwo(3)).toEqual(5);
  });
});
