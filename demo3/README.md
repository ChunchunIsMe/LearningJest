## 匹配器
### 起步
我们可以继续使用demo2的代码

删除math.js和math.test.js

创建matcher.test.js

写完至少一个test之后运行npm run test，因为jest在运行时要最少保证测试代码中拥有一个test，要不然会报 Your test suite must contain at least one test.的错误
### 常见的Matchers
1. toBe

相当于 ===
```
test('2+2=4', () => {
  expect(2 + 2).toBe(4);
})
```
2. toEqual

toEqual会将引用类型中的项进行一一对比，但是并不匹配引用地址
```
test('{} 值等于 {}', () => {
  const obj1 = {
    name: 'obj'
  };
  const obj2 = {
    name: 'obj'
  };
  expect(obj1).toEqual(obj2);
})
```
3. toBeGreaterThan/toBegreaterThanOrEqual/toBeLessThan/toBeLessThanOrEqual

这四个方法看名字都能看出来分别是>、>=、<、<=
```
test('整数', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe 和 toEqual 同样也能验证数字
  expect(value).toBe(4);
  expect(value).toEqual(4);
})
```
4. toBeCloseTo

当进行浮点数比较的时候，使用toBe或者toEqual会不准确

因为JS的特殊浮点数的计算不精确，如：0.1+0.2 !== 0.3 所以比较浮点数浮点数使用toBeCloseTo
```
test('浮点数', () => {
  const value = 0.1 + 0.2;
  // 因为JS的特殊浮点数的计算不精确，如：0.1+0.2 !== 0.3 所以比较浮点数浮点数使用toBeCloseTo
  expect(value).toBeCloseTo(0.3);
})
```
5. toMatch

当进行字符串比较的时候我们可以使用toMatch
```
// 字符串比较
test('字符串', () => {
  const value = 'hello world';
  // 即可以用正则也可以直接比较
  expect(value).toMatch(/^he/);
  expect(value).toMatch('hello world');
  // 当然我们也可以使用toBe、toEqual
  expect(value).toBe('hello world');
  expect(value).toEqual('hello world');
})
```
5. toContain

你可以通过toContain来检测特定的一项是否在可迭代项
```
// 数组和可迭代项
test('数组和可迭代项', () => {
  // 可以使用toContain来检测可迭代项中是否有特定的项
  const arr = ['hello', 'world'];
  expect(arr).toContain('hello');
  expect(new Set(arr)).toContain('world');
})
```
6. toThrow

如果你想检测某个函数在调用时是否会抛出错误，就使用toThrow
```
// 异常处理
function throwError() {
  throw Error('throw error');
}

test('Error', () => {
  // 我们可以使用 toThrow 去检测函数调用的时候是否抛出了错误
  expect(throwError).toThrow();
  expect(throwError).toThrow(Error);

  // 还可以通过正则进行匹配错误
  expect(throwError).toThrow('throw error');
  expect(throwError).toThrow(/^throw/);
})
```