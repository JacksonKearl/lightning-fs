import CacheFS from "../CacheFS";

const treeText = require('./__fixtures__/tree.txt.js');

describe("CacheFS module", () => {
  it("print ∘ parse == id", () => {
    const fs = new CacheFS();
    let parsed = fs.parse(treeText)
    let text = fs.print(parsed)
    expect(text).toEqual(treeText)
  });
  it("size()", () => {
    const fs = new CacheFS();
    fs.activate()
    expect(fs.size()).toEqual(0)
    fs.activate(treeText)
    let inodeCount = treeText.trim().split('\n').length
    expect(fs.size()).toEqual(inodeCount)
  });
});
