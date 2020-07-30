# zollty-util.js

[![npm](https://img.shields.io/npm/dt/@zollty/zollty-util.svg)](github-https://www.npmjs.com/package/@zollty/zollty-util)
[![npm](https://img.shields.io/npm/v/@zollty/zollty-util.svg)](https://www.npmjs.com/package/@zollty/zollty-util)


A small JavaScript utility library.   

Package with `rollup.js`, exported as `iife amd cmd cjs umd es6`  module.  

Support most modern browsers, not include `IE`. Support Node 8+.  

## Install

```bash
npm install @zollty/zollty-util
```

## API

[See this dir](https://github.com/zollty-org/zollty-util.js/tree/master/dist)    

examples:   
```txt
validate: 
  isBankCard,
  isIdCard,
  isPhoneNum,
  validateMobile,

collection:
  toMapKey,
  toMapValue,

string:
  strTemplate,

```

## Usage

```javascript
import {
  toMapKey,
  toMapValue
} from '@zollty/zollty-util';

console.log(toMapKey); // Function
console.log(toMapValue); // Function
```

Can also import like

```javascript
import zt from '@zollty/zollty-util';

console.log(zt.toMapKey); // Function
console.log(zt.toMapValue); // Function
```

or like this

```javascript
import toMapKey from '@zollty/zollty-util/toMapKey';
import toMapValue from '@zollty/zollty-util/toMapValue';

console.log(toMapKey); // Function
console.log(toMapValue); // Function
```


### toMapKey

get the key set of a map and a value array:
```javascript
// suppose have data
const data = {"s":5, "a": 4, "b": 3, "c": 2, "d": 1}
const vals = [4 ,3, 2]
// we want to get the key set ["a", "b", "c"]
const keys = zt.toMapKey(vals, data);
```


### toMapValue

get the value set of a map and a key array:
```javascript
// suppose have data
const data = {"s":5, "a": 4, "b": 3, "c": 2, "d": 1}
const keys = ["a", "b", "c"]
// we want to get the value set [4, 3, 2]
const vals = zt.toMapValue(keys, data);
```

### strTemplate

```javascript
  /**
   * 替换模块字符串中的占位符
   * ，例如s = <span id="aaa">{{a}}</span>
   * val = {a:111}
   * 结果为：<span id="aaa">111</span>
   * 如果，
   * val = [{a:111}, {a:222}]
   * split = <br/>
   * 结果为：
   * <span id="aaa">111</span><br/><span id="aaa">222</span>
   *
   * @param {string} s 模板字符串，例如<span>{{b}}</span>
   * @param {Object|array} val 值
   * @param {string} split 数组分割字符
   */
  function strTemplate(s, val, split)
```


### more examples
please [see the code](https://github.com/zollty-org/zollty-util.js/tree/master/dist) directly.


## License

Released under the MIT Licenses.
