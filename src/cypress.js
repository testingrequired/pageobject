import PageObject from "./pageObject";

module.exports = class CypressPageObject extends PageObject {
  constructor(driver, root) {
    super(driver, root, "find", "filter");
  }
};
