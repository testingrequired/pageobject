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
      [querySelectorAllMethod]: jest.fn(() => [])
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
    let root;

    beforeEach(() => {
      root = pageObject.root;
    });

    it("should return getRoot result", () => {
      expect(root).toBe(expectedRoot);
    });

    it("should call getRoot", () => {
      expect(getRoot).toBeCalledTimes(1);
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

      it("should be an instance of page object ", () => {
        expect(result).toBeInstanceOf(PageObject);
      });

      describe("root", () => {
        let root;

        beforeEach(() => {
          root = result.root;
        });

        it("should be expected result root", () => {
          expect(root).toBe(expectedResultRoot);
        });

        it("should call root querySelectorMethod", () => {
          expect(expectedRoot[querySelectorMethod]).toHaveBeenCalledWith(
            expectedSelector
          );
        });
      });
    });
  });
});
