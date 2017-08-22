jest.dontMock("../search");
jest.mock("../client");

import { findByTitle, findById, search, RequestParams, findByIdWithSeasons } from "../search";
import * as Client from "../client";

describe("findByTitle", () => {
  const params: RequestParams = {
    includeTomatoesRating: false,
  };
  let get: jasmine.Spy;

  beforeEach(() => {
    get = spyOn(Client, "get").and.callFake(() => {
      return new Promise<void>((resolve, reject) => {
        resolve();
      });
    });
  });

  it("should add title to the params", () => {
    findByTitle("title");
    expect(get).toBeCalledWith({
      title: "title",
    });
  });

  it("should pass on the params", () => {
    findByTitle("title", params);
    expect(get).toBeCalledWith({
      title: "title",
      includeTomatoesRating: false,
    });
  });
});

describe("findById", () => {
  const params: RequestParams = {
    includeTomatoesRating: false,
  };
  let get: jasmine.Spy;

  beforeEach(() => {
    get = spyOn(Client, "get").and.callFake(() => {
      return new Promise<void>((resolve, reject) => {
        resolve();
      });
    });
  });

  it("should add imdbId to the params", () => {
    findById("id");
    expect(get).toBeCalledWith({
      imdbId: "id",
    });
  });

  it("should pass on the params", () => {
    findById("id", params);
    expect(get).toBeCalledWith({
      imdbId: "id",
      includeTomatoesRating: false,
    });
  });
});

describe("search", () => {
  const params: RequestParams = {
    includeTomatoesRating: false,
  };
  let get: jasmine.Spy;

  beforeEach(() => {
    get = spyOn(Client, "get").and.callFake(() => {
      return new Promise<void>((resolve, reject) => {
        resolve();
      });
    });
  });

  it("should add search to the params", () => {
    search("search");
    expect(get).toBeCalledWith({
      search: "search",
    });
  });

  it("should pass on the params", () => {
    search("search", params);
    expect(get).toBeCalledWith({
      search: "search",
      includeTomatoesRating: false,
    });
  });
});

describe("findByIdWithSeasons", () => {
  (Client as any).get = jest.fn().mockReturnValue(Promise.resolve({ title: "Hello world", totalSeasons: "12" }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the show details with the season details", async () => {
    const show = await findByIdWithSeasons("id");
    expect(show).toMatchSnapshot();
  });

  it("should make a call for each season", async () => {
    await findByIdWithSeasons("id");
    for (let i = 1; i <= 12; i++) {
      expect(Client.get).toBeCalledWith({ imdbId: "id", season: i });
    }
  });

});
