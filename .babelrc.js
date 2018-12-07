module.exports = {
  // 默认使用 .browserslistrc 的配置
  // 具体说明参见：https://babel.docschina.org/docs/en/babel-preset-env
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ],

  // config env as follows

  //   "env": {
  //     "test": {
  //       "presets": [
  //         [
  //           "@babel/preset-env",
  //           {
  //             "useBuiltIns": "entry"
  //           }
  //         ]
  //       ]
  //     },
  //     "production": {
  //       "presets": [
  //         [
  //           "@babel/preset-env",
  //           {
  //             "useBuiltIns": "entry"
  //           }
  //         ]
  //       ]
  //     }
  //   },

  // use plugin-transform-runtime
  // 参见：https://babel.docschina.org/docs/en/babel-plugin-transform-runtime
  // npm install --save-dev @babel/plugin-transform-runtime
  // npm install --save @babel/runtime-corejs2
  // config in rollup config babel({ runtimeHelpers: true })
  // config as follows

  //   "plugins": [
  //     [
  //       "@babel/plugin-transform-runtime",
  //       {
  //         "corejs": 2,
  //         "helpers": true,
  //         "regenerator": true,
  //         "useESModules": false
  //       }
  //     ]
  //   ],
  "ignore": [
    "node_modules/**",
    "*.test.js"
  ]
}
