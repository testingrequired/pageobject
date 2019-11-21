import PageObject from "./pageObject";

module.exports = class TestingLibPageObject extends PageObject {
  constructor(driver, root) {
    super(driver, root, "queryBy", "queryAllBy");
  }
};
