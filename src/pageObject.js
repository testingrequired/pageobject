const querySelectorMethod = Symbol("querySelector");
const querySelectorAllMethod = Symbol("querySelectorAll");

class PageObject {
  constructor(driver, root, rootSelectorMethods = {}) {
    this.driver = driver;

    const {
      rootQuerySelectorMethod = "querySelector",
      rootQuerySelectorAllMethod = "querySelectorAll"
    } = rootSelectorMethods;

    Object.defineProperty(this, "root", {
      enumerable: true,
      get: root
    });

    this[querySelectorMethod] = (selector, PageObjectClass = PageObject) => {
      return new PageObjectClass(
        this.driver,
        () => this.root[rootQuerySelectorMethod](selector),
        rootSelectorMethods
      );
    };

    this[querySelectorAllMethod] = (selector, PageObjectClass = PageObject) => {
      const elements = this.root[rootQuerySelectorAllMethod](selector);

      return elements.reduce(
        (pageObjects, element, i) => [
          ...pageObjects,
          new PageObjectClass(
            this.driver,
            () => elements[i],
            rootSelectorMethods
          )
        ],
        []
      );
    };

    this[rootQuerySelectorMethod] = (...args) =>
      this[querySelectorMethod](...args);

    this[rootQuerySelectorAllMethod] = (...args) =>
      this[querySelectorAllMethod](...args);

    return new Proxy(this, {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        }

        if (prop in target.root) {
          return target.root[prop];
        }

        throw new Error(
          `Property '${prop}' not found on page object or root element`
        );
      }
    });
  }
}

module.exports = PageObject;
