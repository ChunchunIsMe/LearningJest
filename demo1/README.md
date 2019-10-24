# 自动化测试产生的背景及其原理
测试其实就是将预期的结果和产生的结果做比对。

现在我们先来手写测试代码，对Jest的原理进行简单讲解

## 手写测试代码
新建index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>main.js</title>
</head>
<body>
  <script src="./math.js"></script>
</body>
</html>
```
新建math.js
```
// math.js
function add(a, b) {
  return a + b
}

function minus(a, b) {
  return a * b // 先将这里写为 * 为了测试错误代码
}
```
math.test.js
```
var result = add(3, 7);
var expected = 10;
if(result !== expected ) {
  throw Error(`3+7应该等于${expected}, 但结果却是${result}`)
}

var result1 = minus(3, 3);
var expected1 = 0;
if(result1 !== expected1) {
  throw Error(`3 - 3应该等于${expected1}, 但结果却是${result1}`)
}
```
然后我们在浏览器打开index.html,然后将math.test.js的代码copy到console中运行。

然后我们可以看到Uncaught Error: 3 - 3应该等于0, 但结果却是9。

然后我们将math.js中的minus改为a - b然后增加multi函数
```
// math.js
function add(a, b) {
  return a + b
}

function minus(a, b) {
  return a - b // 先将这里写为 * 为了测试错误代码
}

function multi(a, b) {
  return a * b
}
```
然后再次执行上面的步骤则会发现没有进行报错了
## 构建expect函数
例如:
```
function expect(data) {
  return {
    toBe(value) {
      if(value !== data) {
        throw Error('预期值和实际值不同')
      }
    }
  }
}
```
然后我们再将minus改成a*b

新建math2.test.js
```
function expect(data) {
  return {
    toBe(value) {
      if(value !== data) {
        throw Error('预期值和实际值不同')
      }
    }
  }
}

expect(add(3, 7)).toBe(10);
expect(minus(3, 3)).toBe(0);
```
我们再将math2.test.js的代码放入index.html的console中

你会发现，错是报了，但是却不知道是哪一块报的错

所以我们在math2.test.js中创建test函数
```
// math2.test.js
function test(message, fn) {
  try {
    fn()
    console.log(`${message} 测试通过`)
  } catch(e) {
    console.log(`${message} 测试未通过, ${e}`)
  }
}

function expect(data) {
  return {
    toBe(value) {
      if(value !== data) {
        throw Error('预期值和实际值不同')
      }
    }
  }
}

test('测试加法3 + 7', () => {
  expect(add(3, 7)).toBe(10);
})

test('测试减法3 - 3', () => {
  expect(minus(3, 3)).toBe(0);
})
```
我们再按上面的流程将math2.test.js放入到console中

consloe中成功打印两句话

测试加法3 + 7 测试通过

测试减法3 - 3 测试未通过, Error: 预期值和实际值不同

> 至此我们简单地复现了Jest和Mocha的底层实现原理