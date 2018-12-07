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
import ztu from '@zollty/zollty-util';

console.log(ztu.toMapKey); // Function
console.log(ztu.toMapValue); // Function
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
const keys = ztu.toMapKey(vals, data);
```


### toMapValue

get the value set of a map and a key array:
```javascript
// suppose have data
const data = {"s":5, "a": 4, "b": 3, "c": 2, "d": 1}
const keys = ["a", "b", "c"]
// we want to get the value set [4, 3, 2]
const vals = ztu.toMapValue(keys, data);
```

### more examples
please [see the code](https://github.com/zollty-org/zollty-util.js/tree/master/dist) directly.


## License

Released under the MIT Licenses.
