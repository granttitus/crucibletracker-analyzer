const analyze = require('./analyzer');

test('calculates cards discarded', () => {
  const fixture = require('../fixtures/cards-discarded-test');
  const result = analyze(fixture);

  expect(result.winner.name).toEqual('Madara');
  expect(result.winner.cardsDiscarded).toEqual(3);
  expect(result.loser.name).toEqual('stronglink');
  expect(result.loser.cardsDiscarded).toEqual(6);
});
