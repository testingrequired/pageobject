const PageObject = require("./pageObject");

describe("PageObject", () => {
  const querySelectorMethod = "querySelectorMethod";
  const querySelectorAllMethod = "querySelectorAllMethod";
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
    pageObject = new PageObject(
      null,
      getRoot,
      querySelectorMethod,
      querySelectorAllMethod
    );
  });

  describe("root", () => {
    it("should return getRoot result", () => {
      expect(pageObject.root).toBe(expectedRoot);
    });
  });

  describe("querySelectorMethod", () => {
    it("should be defined", () => {
      expect(pageObject[querySelectorMethod]).toBeDefined();
    });

    describe("returns", () => {
      let result;

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
  });

  describe("querySelectorAllMethod", () => {
    it("should be defined", () => {
      expect(pageObject[querySelectorAllMethod]).toBeDefined();
    });

    describe("returns", () => {
      let results;

      beforeEach(() => {
        results = pageObject[querySelectorAllMethod](expectedSelector);
      });

      it("should be an array of results", () => {
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
  });
});
