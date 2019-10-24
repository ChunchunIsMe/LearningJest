function expect(result) {
  return {
    toBe: function (actual) {
      if (result !== actual) {
        throw new Error('预期值和实际值不相等');
      }
    }
  }
}

function test(desc, fn) {
  try {
    fn();
    console.log(`${desc}测试成功`);
  } catch (error) {
    console.log(`${desc}测试失败, ${error}`);
  }
}

test('测试加法3+7', () => {
  expect(add(3, 7)).toBe(10);
})
test('测试减法', () => {
  expect(minus(3, 3)).toBe(0);
})
