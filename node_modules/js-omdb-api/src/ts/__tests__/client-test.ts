jest.dontMock("../client");
jest.dontMock("fetch-mock");
jest.dontMock("whatwg-fetch");

import { get } from "../client";
import * as fetchMock from "fetch-mock";
import "whatwg-fetch";

describe("client", () => {
  let params = {
    search: null,
  };

  beforeEach(() => {
    fetchMock.get("*", {});
    params = {
      search: "game of thrones",
    };
  });

  it("should map the keys to the correct url props", () => {
    get(params);
    expect(fetchMock.lastUrl()).toContain(`s=game of thrones`);
  });

  it("should trow an error if wrong keys are passed", () => {
    const wrongParams = Object.assign({wrongParam: "wrongPram", params});
    expect(() => get(wrongParams)).toThrowError("Invalid key wrongParam");
  });
});
