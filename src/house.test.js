const analyze = require('./analyzer');
const fixtureIncubation = require('../fixtures/incubation');
const fixtureGrenadeSnib = require('../fixtures/grenade-snib');

test('calculates house turns', () => {
  const result = analyze(fixtureIncubation);
  expect(result.winner.turnsBrobnar).toEqual(0);
  expect(result.winner.turnsDis).toEqual(1);
  expect(result.winner.turnsLogos).toEqual(0);
  expect(result.winner.turnsMars).toEqual(2);
  expect(result.winner.turnsShadows).toEqual(3);
  expect(result.winner.turnsSanctum).toEqual(0);
  expect(result.winner.turnsUntamed).toEqual(0);

  expect(result.loser.turnsBrobnar).toEqual(0);
  expect(result.loser.turnsDis).toEqual(4);
  expect(result.loser.turnsLogos).toEqual(0);
  expect(result.loser.turnsMars).toEqual(1);
  expect(result.loser.turnsShadows).toEqual(1);
  expect(result.loser.turnsSanctum).toEqual(0);
  expect(result.loser.turnsUntamed).toEqual(0);
});

test('calculates house data (2)', () => {
  const result = analyze(fixtureGrenadeSnib);
  expect(result.winner.turnsBrobnar).toEqual(6);
  expect(result.winner.turnsDis).toEqual(5);
  expect(result.winner.turnsLogos).toEqual(0);
  expect(result.winner.turnsMars).toEqual(4);
  expect(result.winner.turnsShadows).toEqual(0);
  expect(result.winner.turnsSanctum).toEqual(0);
  expect(result.winner.turnsUntamed).toEqual(0);

  expect(result.loser.turnsBrobnar).toEqual(0);
  expect(result.loser.turnsDis).toEqual(5);
  expect(result.loser.turnsLogos).toEqual(5);
  expect(result.loser.turnsMars).toEqual(0);
  expect(result.loser.turnsShadows).toEqual(5);
  expect(result.loser.turnsSanctum).toEqual(0);
  expect(result.loser.turnsUntamed).toEqual(0);
});

