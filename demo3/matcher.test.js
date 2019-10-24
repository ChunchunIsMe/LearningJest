// 完全相等

test('2+2=4', () => {
  expect(2 + 2).toBe(4);
})

// 对比引用类型
test('{} 值等于 {}', () => {
  const obj1 = {
    name: 'obj'
  };
  const obj2 = {
    name: 'obj'
  };
  expect(obj1).toEqual(obj2);
})

// 真值比较

test('null', () => {
  const n = null;
  expect(n).toBeNull();
})

test('undefined', () => {
  const u = undefined;
  expect(u).toBeUndefined();
})

test('definedAndNot', () => {
  const u = undefined;
  expect(u).not.toBeDefined();
})

test('true', () => {
  const s = 's';
  const n = 1;
  const b = true;
  expect(s).toBeTruthy();
  expect(n).toBeTruthy();
  expect(b).toBeTruthy();
})

test('fasle', () => {
  const s = '';
  const n = 0;
  const b = false;
  expect(s).toBeFalsy();
  expect(n).toBeFalsy();
  expect(b).toBeFalsy();
})

// 数值比较

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

test('浮点数', () => {
  const value = 0.1 + 0.2;
  // 因为JS的特殊浮点数的计算不精确，如：0.1+0.2 !== 0.3 所以比较浮点数浮点数使用toBeCloseTo
  expect(value).toBeCloseTo(0.3);
})

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

// 数组和可迭代项
test('数组和可迭代项', () => {
  // 可以使用toContain来检测可迭代项中是否有特定的项
  const arr = ['hello', 'world'];
  expect(arr).toContain('hello');
  expect(new Set(arr)).toContain('world');
})

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