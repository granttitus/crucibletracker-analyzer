const analyze = require('./analyzer');

test('calculates starting chains', () => {
  const fixture = require('../fixtures/4-starting-chains');
  const result = analyze(fixture);
  expect(result.winner.name).toEqual('stronglink');
  expect(result.winner.chainsStarting).toEqual(4);
  expect(result.loser.name).toEqual('Fragia10');
  expect(result.loser.chainsStarting).toEqual(0);
});

test('calculates starting chains (2)', () => {
  const fixture = require('../fixtures/phosphorus-stars');
  const result = analyze(fixture);
  expect(result.winner.chainsStarting).toEqual(0);
  expect(result.loser.chainsStarting).toEqual(0);
});

test('calculates chains gained', () => {
  const fixture = require('../fixtures/4-starting-chains');
  const result = analyze(fixture);
  expect(result.winner.name).toEqual('stronglink');
  expect(result.winner.chainsGained).toEqual(8);
  expect(result.loser.name).toEqual('Fragia10');
  expect(result.loser.chainsGained).toEqual(1);
});

test('calculates chains gained (2)', () => {
  const fixture = require('../fixtures/phosphorus-stars');
  const result = analyze(fixture);
  expect(result.winner.chainsGained).toEqual(0);
  expect(result.loser.chainsGained).toEqual(3);
});
