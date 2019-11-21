import PageObject from "./pageObject";

module.exports = class WdioPageObject extends PageObject {
  constructor(driver, root) {
    super(driver, root, "$", "$$");
  }
};
