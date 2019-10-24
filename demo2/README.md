## Jest的简单配置
### Jest的简单使用
我们只拥有test和expect是不够的的，所以让我们来学习Jest吧。

我们首先安装jest
```
npm init -y
npm i jest -D
```
我这次安装的版本是@24.9.0.

写我们这次的测试方法，仍然是我们的math.js
```
// math.js
function add(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function multi(a, b) {
  return a * b;
}

module.exports = {
  add,
  minus,
  multi
}
```
然后我们写测试代码,因为jest是运行在node中的，所以我们使用CommonJS的规范来导入
```
// math.test.js
const { add, minus, multi } = require('./math');
test('测试加法3 + 7', () => {
  expect(add(3, 7)).toBe(10);
})

test('测试减法3 - 3', () => {
  expect(minus(3, 3)).toBe(0);
})

test('测试乘法3 * 3', () => {
  expect(multi(3, 3)).toBe(9);
})
```
修改package.json,当然你也可以使用`npx jest`
```
{
  "name": "demo2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.6.4",
    "@babel/preset-env": "^7.6.3",
    "jest": "^24.9.0"
  }
}
```
运行`npm run test`，这样math.test.js就会运行，然后你就发现提示你三个test都通过了

但是如果我们修改了预期
```
// ...
test('测试减法3 - 3', () => {
  expect(minus(3, 3)).toBe(10);
})
// ...
```
再次运行`npm run test`.终端报错，提示你有一个测试没用通过。

Jest帮我们完成的是两类内容

1. 单元测试
2. 集成测试

也就是模块测试和多个模块测试，所以Jest需要你引入模块

### Jest简单配置
#### 初始化Jest
Jest本身就有一些配置，和webpack类似，webpack你不做配置你也能打包

但是我们还是希望配置Jest，生成Jest配置文件
```
npx jest --init
```
期间它会问你三个问题

分别是
1. 选择你会在哪个环节测试？ 我们选择browser-like
2. 你是否要增加代码覆盖率报告？ yes
3. 是否自动清除每个测试之间的模拟调用和实例？ yes

完成之后会在目录下增加一个jest.config.js文件，里面就是各种配置的说明

里面有两个注释是打开了的
```
clearMocks: true,
coverageDirectory: "coverage",
```
一个是mock的，一个是Coverage，因为前面它在询问的时候，我们都选择了Yes，所以这两个配置项就开启了

如果我们选择了node环境配置文件会不一样。
#### 生成测试覆盖率
我们运行`npx jest --coverage`生成测试覆盖率的说明，同时会生成一个coverage的目录

浏览器打开coverage/lcov-report/index.html，这个页面会告诉我们哪些文件被测过，覆盖率是多少。

如果觉得npx比较麻烦可以配置package.json
```
{
  // ...
  "scripts": {
    "test": "jest",
    "coverage": "jest --coverage"
  },
  // ...
}
```
修改jest.config.js
```
coverageDirectory: 'test'
```
将之前的coverage文件删除，运行`npm run coverage`，发现生成了一个test文件夹，内容和之前的coverage一致。
#### 使用Babel兼容ES6
现在浏览器都不是使用的CommonJS规范来导出，这样测试导出恐怕不行，所以我们使用ES6规范来导入和导出代码
```
// math.js
export function add(a, b) {
  return a + b;
}

export function minus(a, b) {
  return a - b;
}

export function multi(a, b) {
  return a * b;
}

```
math.test.js
```
// math.test.js
import { add, minus, multi } from './math'

test('测试加法3 + 7', () => {
  expect(add(3, 7)).toBe(10);
})

test('测试减法3 - 3', () => {
  expect(minus(3, 3)).toBe(0);
})

test('测试乘法3 * 3', () => {
  expect(multi(3, 3)).toBe(9);
})
```
让我们再次运行npm run test，竟然发现它报错了！！因为Jest是运行在Node环境的，ES6规范Node还不支持。

这个时候就需要使用babel7来转换ES6代码。
```
npm i @babel/core @babel/preset-env -D
```
新建.babelrc
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```
这样就会根据我们当前的node环境，来结合prset-env来做转换，之后运行npm run test就可以啦

Jest的内部机制是：让你运行jest的时候，它内部集成了一个插件(babel-jest)会检测当前的环境下你是否安装了babel或者是babel-core

安装了babel-core就会去取babel的配置，会在运行jest之前结合babel做一个转换，转换成可以执行的代码，之后就可以运行了。

我们在[官方文档](https://jestjs.io/docs/en/getting-started '官方文档')可以看到更多细节

#### Jest自动启动
每次手动运行npm run test非常麻烦，所以我们可以使用 --watchAll 配置项

修改package.json
```
{
  // ...
  "scripts": {
  "test": "jest --watchAll",
  "coverage": "jest --coverage"
  },
  // ...
}
```
运行`npm run test`，这样Jest就会监听测试文件的变化做到自动重新去测试所有测试用例。