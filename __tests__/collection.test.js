import {
  toMapKey,
  toMapValue
} from '../tmp/zollty-util.es';

// 文档地址：https://jestjs.io/docs/zh-Hans/getting-started

describe('collection', () => {

  it('toMapKey!', () => {
    const map = {
      "s": 5,
      "a": 4,
      "b": 3,
      "c": 2,
      "d": 1
    }
    const vals = [4, 3, 2]
    const ret = ["a", "b", "c"]
    expect(toMapKey(vals, map)).toEqual(ret)
  });

  it('toMapValue!', () => {
    const map = {
      "s": 5,
      "a": 4,
      "b": 3,
      "c": 2,
      "d": 1
    }
    const ret = [4, 3, 2]
    const keys = ["a", "b", "c"]
    expect(toMapValue(keys, map)).toEqual(ret)
  });

});
