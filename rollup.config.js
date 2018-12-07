import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import filesize from 'rollup-plugin-filesize';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

const plugins = [
  globals(),
  builtins(),
  localResolve(),
  resolve({
    module: true,
    jsnext: true,
    main: true,
    preferBuiltins: true,
    browser: true,
    modulesOnly: true,
  }),
  commonjs(),
  babel({
    // runtimeHelpers: true,
    exclude: 'node_modules/**'
  })
  //, terser(),
  , filesize()
];


export default [
  // 1. 生成umd、iife、cjs
  {
    input: `tmp/main.js`,
    output: [{
        file: `tmp/zollty-util.js`,
        format: 'umd',
        name: 'ztu',
        // sourcemap: true
      },
      {
        file: `tmp/zollty-util.fe.js`,
        format: 'iife',
        name: 'ztu'
      },
      {
        file: `tmp/zollty-util.cjs.js`,
        format: 'cjs',
        name: 'ztu'
      },
      // {
      //   file: `tmp/zollty-util.es.js`,
      //   format: 'es',
      //   name: 'ztu'
      // }
    ],
    plugins,
  },
  // 2. 生成 es6 module的es5语法的文件，
  // 有什么作用？参见：https://loveky.github.io/2018/02/26/tree-shaking-and-pkg.module/
  {
    input: `tmp/zollty-util.esm.js`,
    output: [{
      file: `tmp/zollty-util.es.js`,
      format: 'es',
      name: 'ztu'
    }],
    plugins,
  },
  {
    input: `tmp/bom.js`,
    output: [{
        file: `tmp/bom.js`,
        format: 'umd',
        name: 'bom'
      },
      {
        file: `tmp/bom.fe.js`,
        format: 'iife',
        name: 'bom'
      }
    ],
    plugins,
  }
];

// 注意：此处没有生成 压缩js 以及 sourcemap
// 而是在package.json脚本里面直接调用 terser 命令来生成。
// terser是uglify-es6的增强版，因为uglify不支持es6，而uglify-es6又停止更新了，故推出了terser

// import { terser } from 'rollup-plugin-terser';
// 引入 "rollup-plugin-terser": "latest",
//     "rollup-plugin-uglify": "^6.0.0",
