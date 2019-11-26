const PageObject = require("./pageObject");

describe("PageObject", () => {
  const querySelectorMethod = "rootQuerySelectorMethod";
  const querySelectorAllMethod = "rootQuerySelectorAllMethod";
  const expectedSelector = "selector";

  let getRoot;
  let expectedRoot;
  let expectedResultRoot;
  let pageObject;

  beforeEach(() => {
    driver = {};
    expectedResultRoot = {};
    expectedRoot = {
      [querySelectorMethod]: jest.fn(() => expectedResultRoot),
      [querySelectorAllMethod]: jest.fn(() => [expectedResultRoot])
    };
    getRoot = jest.fn(() => expectedRoot);
    pageObject = new PageObject(null, getRoot, {
      rootQuerySelectorMethod: querySelectorMethod,
      rootQuerySelectorAllMethod: querySelectorAllMethod
    });
  });

  describe("default root method names", () => {
    beforeEach(() => {
      pageObject = new PageObject(null, getRoot);
    });

    it("should define querySelector", () => {
      expect(pageObject.querySelector).toBeDefined();
    });

    it("should define querySelectorAll", () => {
      expect(pageObject.querySelectorAll).toBeDefined();
    });
  });

  describe("root", () => {
    it("should return getRoot result", () => {
      expect(pageObject.root).toBe(expectedRoot);
    });

    describe("proxied calls", () => {
      beforeEach(() => {
        expectedRoot.rootOnly = jest.fn();
      });

      it("should call method on root", () => {
        pageObject.rootOnly();

        expect(expectedRoot.rootOnly).toBeCalled();
      });

      it("should throw if method not on page object or root", () => {
        expect(() => pageObject.nonExistentMethod()).toThrow(
          "Property 'nonExistentMethod' not found on page object or root element"
        );
      });
    });
  });

  describe("querySelectorMethod", () => {
    let result;

    it("should be defined", () => {
      expect(pageObject[querySelectorMethod]).toBeDefined();
    });

    describe("result", () => {
      beforeEach(() => {
        result = pageObject[querySelectorMethod](expectedSelector);
      });

      it("should be an instance of page object", () => {
        expect(result).toBeInstanceOf(PageObject);
      });

      describe("root", () => {
        it("should be expected result root", () => {
          expect(result.root).toBe(expectedResultRoot);
        });
      });
    });

    describe("when passed custom page object", () => {
      class CustomPageObject {}

      describe("result", () => {
        beforeEach(() => {
          result = pageObject[querySelectorMethod](
            expectedSelector,
            CustomPageObject
          );
        });

        it("should be an instance of custom page object", () => {
          expect(result).toBeInstanceOf(CustomPageObject);
        });
      });
    });
  });

  describe("querySelectorAllMethod", () => {
    it("should be defined", () => {
      expect(pageObject[querySelectorAllMethod]).toBeDefined();
    });

    describe("results", () => {
      let results;

      beforeEach(() => {
        results = pageObject[querySelectorAllMethod](expectedSelector);
      });

      it("should be an array", () => {
        expect(Array.isArray(results)).toBe(true);
        expect(results.length).toBe(1);
      });

      describe("result", () => {
        let result;

        beforeEach(() => {
          result = results[0];
        });

        it("should be an instance of page object", () => {
          expect(result).toBeInstanceOf(PageObject);
        });

        describe("root", () => {
          it("should be expected result root", () => {
            expect(result.root).toBe(expectedResultRoot);
          });
        });
      });
    });

    describe("when passed custom page object", () => {
      class CustomPageObject {}

      describe("results", () => {
        let results;

        beforeEach(() => {
          results = pageObject[querySelectorAllMethod](
            expectedSelector,
            CustomPageObject
          );
        });
        describe("result", () => {
          let result;

          beforeEach(() => {
            result = results[0];
          });

          it("should be an instance of custom page object", () => {
            expect(result).toBeInstanceOf(CustomPageObject);
          });
        });
      });
    });
  });
});
