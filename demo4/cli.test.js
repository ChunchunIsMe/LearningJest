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