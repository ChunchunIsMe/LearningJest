## Jest命令行工具的使用
### 准备工作
我们仍然可以使用demo2的代码，然后删除math.js和math.test.js

创建cli.test.js
```
test('toMatch', () => {
  const str = 'http://www.baidu.com';
  expect(str).toMatch('baidu');
  expect(str).toMatch(/baidu/);
})

test('toContain', () => {
  const arr = ['a', 'b', 'c'];
  const data = new Set(arr);
  expect(data).toContain('b');
})

const throwNewErrorFunc = () => {
  throw new Error('this is a new error');
}

test('error', () => {
  expect(throwNewErrorFunc).toThrow('error');
})
```
创建cli1.test.js
```
test('cli2', () => {
  expect(2 + 2).toBe(4)
})
```
### Jest命令行
运行`npm run test`，会有一些命令，如：
> Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.

我们将cli.test.js的任意一个修改成错误的，这个时候只有一个报错了，如果继续修改，还是把测试用例全部都跑一遍，当你的测试用例很多的时候，运行时间也就越久，我们需要 Jest 只针对没有通过测试的用例去运行。

#### f:只会去跑之前没有通过的测试

这个时候只要我们在控制台按下f就可以了

然后我们将之前错误的测试改回来，你会发现Jest将另外的原来成功的测试跳过了，测试后也有 skipped 字样，它只测试了之前失败的例子

如果出现 Watch Usage: Press w to show more. 只要按 w 就会出现更多信息

如果这个时候再次修改测试代码然后保存，他也不会去跑所有的测试用例了，因为测试用例都通过了，没有错误。

如果要退出f这个模式，只需要再按一下f

#### o:只会测试当前改变的代码