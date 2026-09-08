import { describe, expect, it } from "vitest";
import { parsePageRanges } from "../utils/pageRanges";

describe("parsePageRanges", () => {
  it("parses a single page", () => {
    expect(parsePageRanges("1", 10)).toEqual([0]);
  });

  it("parses multiple pages and ranges", () => {
    expect(
      parsePageRanges("1-3,5,8-10", 10)
    ).toEqual([0, 1, 2, 4, 7, 8, 9]);
  });

  it("removes duplicate pages", () => {
    expect(
      parsePageRanges("1-3,2,3", 10)
    ).toEqual([0, 1, 2]);
  });

  it("rejects a page outside the PDF", () => {
    expect(() =>
      parsePageRanges("11", 10)
    ).toThrow();
  });

  it("rejects an invalid range", () => {
    expect(() =>
      parsePageRanges("5-2", 10)
    ).toThrow();
  });
});