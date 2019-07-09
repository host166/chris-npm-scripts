# postcss-plugin-super-px2rem

[![NPM version](https://github.com/host166/postcss-super-px2rem.git)

postcss plugin super px2rem.

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.svg">

## Features

A plugin for PostCSS that generates rem units from pixel units.

## Installation

```bash
$ npm i --save postcss-plugin-super-px2rem
```

## Usage

### input and output

```css
// input
h1 {
  margin: 0 0 20px;
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: 1px;
}

// output
h1 {
  margin: 0 0 0.2rem;
  font-size: 0.32rem;
  line-height: 1.2;
  letter-spacing: 0.01rem;
}
```

### original

```javascript
import { writeFile, readFileSync } from 'fs';
import postcss from 'postcss';
import pxtorem from 'postcss-plugin-super-px2rem';

const css = readFileSync('/path/to/test.css', 'utf8');
const options = {
  replace: false,
};
const processedCss = postcss(pxtorem(options)).process(css).css;

writeFile('/path/to/test.rem.css', processedCss, err => {
  if (err) throw err;
  console.log('Rem file written.');
});
```

### with webpack

```javascript
import px2rem from 'postcss-plugin-super-px2rem';
const px2remOpts = {
  ......
};
 
export default {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
    ],
  },
  postcss: [px2rem(px2remOpts)],
}
```

### with [atool-build](https://github.com/ant-tool/atool-build)

`webpack.connfig.js`

```javascript
import webpack from 'atool-build/lib/webpack';
import super_px2rem from 'postcss-plugin-super-px2rem';

export default webpackConfig => {
  const px2remOpts = {
    ......
  };
  webpackConfig.postcss.push(super_px2rem(px2remOpts));

  return webpackConfig;
};
```

## Configuration

Default:
```js
{
  rootValue: 100,
  unitPrecision: 5,
  propWhiteList: [],
  propBlackList: [],
  exclude:false,
  selectorBlackList: [],
  ignoreIdentifier: false,
  replace: true,
  mediaQuery: false,
  minPixelValue: 1,
  customadaption: "epx"
}
```

- `rootValue` (Number|Object) The root element font size. Default is 100.
    - If rootValue is an object, for example `{ px: 50, rpx: 100 }`, it will
    replace rpx to 1/100 rem , and px to 1/50 rem.
- `unitPrecision` (Number) The decimal numbers to allow the REM units to grow to.
- `propWhiteList` (Array) The properties that can change from px to rem.
    - Default is an empty array that means disable the white list and enable all properties.
    - Values need to be exact matches.
- `propBlackList` (Array) The properties that should not change from px to rem.
    - Values need to be exact matches.
- `exclude` (Reg)  a way to exclude some folder,eg. /(node_module)/.
- `selectorBlackList` (Array) The selectors to ignore and leave as px.
    - If value is string, it checks to see if selector contains the string.
        - `['body']` will match `.body-class`
    - If value is regexp, it checks to see if the selector matches the regexp.
        - `[/^body$/]` will match `body` but not `.body`
- `ignoreIdentifier` (Boolean/String)  a way to have a single property ignored, when ignoreIdentifier enabled, then `replace` would be set to `true` automatically.
- `replace` (Boolean) replaces rules containing rems instead of adding fallbacks.
- `mediaQuery` (Boolean) Allow px to be converted in media queries.
- `minPixelValue` (Number) Set the minimum pixel value to replace.
- `customadaption` (String) Set the type to be converted

### License
MIT
