const querySelectorMethod = Symbol("querySelector");
const querySelectorAllMethod = Symbol("querySelectorAll");

module.exports = class PageObject {
  constructor(
    driver,
    root,
    querySelectorRootMethod = "querySelector",
    querySelectorAllRootMethod = "querySelectorAll"
  ) {
    this.driver = driver;

    Object.defineProperty(this, "root", {
      enumerable: true,
      get: root
    });

    this[querySelectorMethod] = (selector, PageObjectClass = PageObject) => {
      return new PageObjectClass(this.driver, () =>
        this.root[querySelectorRootMethod](selector)
      );
    };

    this[querySelectorAllMethod] = (selector, PageObjectClass = PageObject) => {
      const elements = this.root[querySelectorAllRootMethod](selector);

      return elements.reduce(
        (pageObjects, element, i) =>
          new PageObjectClass(this.driver, () => elements[i]),
        []
      );
    };

    this[querySelectorRootMethod] = (...args) =>
      this[querySelectorMethod](...args);

    this[querySelectorAllRootMethod] = (...args) =>
      this[querySelectorAllMethod](...args);
  }
};
