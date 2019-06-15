const analyze = require('./analyzer');

test('calculates turns', () => {
  const fixture = require('../fixtures/safe-place-23-aember');
  const result = analyze(fixture);
  expect(result.turns).toEqual(11);
});

test('calculates turns (2)', () => {
  const fixture = require('../fixtures/lans');
  const result = analyze(fixture);
  expect(result.turns).toEqual(4);
});

