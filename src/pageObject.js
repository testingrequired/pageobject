const querySelectorMethod = Symbol("querySelector");
const querySelectorAllMethod = Symbol("querySelectorAll");

class PageObject {
  /**
   * Base page object implementation
   * @param {*} driver Webdriver instance
   * @param {() => any} root Function returning web element reference
   * @param {string} querySelectorRootMethod Method name on web element for querying single elements
   * @param {string} querySelectorAllRootMethod Method name on web element for querying multiple elements
   */
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
        (pageObjects, element, i) => [
          ...pageObjects,
          new PageObjectClass(this.driver, () => elements[i])
        ],
        []
      );
    };

    this[querySelectorRootMethod] = (...args) =>
      this[querySelectorMethod](...args);

    this[querySelectorAllRootMethod] = (...args) =>
      this[querySelectorAllMethod](...args);
  }
}

module.exports = PageObject;
