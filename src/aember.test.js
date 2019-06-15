const analyze = require('./analyzer');

test('calculates total aember gained', () => {
  const fixture = require('../fixtures/safe-place-23-aember');
  const result = analyze(fixture);
  expect(result.winner.name).toEqual('stronglink');
  expect(result.winner.aemberTotalGained).toEqual(25);
  expect(result.loser.name).toEqual('BizarroDavid');
  expect(result.loser.aemberTotalGained).toEqual(28);
});

test('calculates total aember gained (2)', () => {
  const fixture = require('../fixtures/chuff-ape-32-aember');
  const result = analyze(fixture);
  expect(result.winner.name).toEqual('Snorp84');
  expect(result.winner.aemberTotalGained).toEqual(38);
  expect(result.loser.name).toEqual('stronglink');
  expect(result.loser.aemberTotalGained).toEqual(33);
});

test('calculates total aember gained (3)', () => {
  const fixture = require('../fixtures/18-aember');
  const result = analyze(fixture);
  expect(result.winner.name).toEqual('Nerapiuma');
  expect(result.winner.aemberTotalGained).toEqual(19);
  expect(result.loser.name).toEqual('stronglink');
  expect(result.loser.aemberTotalGained).toEqual(18);
});

test('calculates total aember gained (4)', () => {
  const fixture = require('../fixtures/many-captured');
  const result = analyze(fixture);
  expect(result.winner.name).toEqual('BHawk');
  expect(result.winner.aemberTotalGained).toEqual(109);
  expect(result.loser.name).toEqual('MarcPagacz');
  expect(result.loser.aemberTotalGained).toEqual(41);
});

test('calculates aember captured', () => {
  const fixture = require('../fixtures/many-captured');
  const result = analyze(fixture);
  expect(result.winner.name).toEqual('BHawk');
  expect(result.winner.aemberCaptured).toEqual(12);
  expect(result.loser.name).toEqual('MarcPagacz');
  expect(result.loser.aemberCaptured).toEqual(63);
});

test('calculates aember gained through pips on cards', () => {
  const fixture = require('../fixtures/aember-pips-gained-test');
  const result = analyze(fixture);
  expect(result.winner.name).toEqual('Nerapiuma');
  expect(result.winner.aemberGainedFromCardPips).toEqual(7);
  expect(result.loser.name).toEqual('stronglink');
  expect(result.loser.aemberGainedFromCardPips).toEqual(14);
});
