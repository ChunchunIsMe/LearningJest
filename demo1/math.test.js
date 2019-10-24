var result = add(3, 7);
var expect = 10;
if (result !== 10) {
  throw Error(`3+7应该等于${expect}, 但结果却是${result}`);
}
var result2 = minus(3, 3);
var expect2 = 0;
if (result2 !== 0) {
  throw Error(`3-3应该等于${expect2}, 但结果却是${result2}`);
}