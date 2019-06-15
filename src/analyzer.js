const {
  getAemberLost,
  getAemberCaptured,
  getTotalAemberGained,
  getAemberGainedFromPipsForPlayer,
  getAemberGainedFromReapForPlayer,
} = require('./aember');
const {
  getCardTypePlayedForPlayer,
  getCardsDiscardedForPlayer,
} = require('./cards');
const {
  getTurnsPerHouseForPlayer
} = require('./house');
const {
  getChainsGained,
  getStartingChains,
} = require('./chains');

const checkMulligan = (player, events) => {
  let firstTurnIndex = 0;
  while (firstTurnIndex < events.length) {
    const event = events[firstTurnIndex];
    if (event.message && event.message.alert && event.message.alert.type === 'endofround' && event.message.alert.message[0] && /End of turn/.test(event.message.alert.message[0])) {
      break;
    }
    firstTurnIndex += 1;
  }

  const pregameEvents = events.slice(0, firstTurnIndex);
  let shuffles = pregameEvents.filter(event => {
     return event.message && event.message[0] && event.message[0].name && event.message[0].name === player && event.message[1] && / is shuffling their deck/.test(event.message[1]); 
  }).length;

  return shuffles > 1;
};

const getTurns = (events) => {
  let turns = 0;
  events.forEach(e => {
    if (e.message && e.message.alert && e.message.alert.type === 'endofround' && e.message.alert.message[0] && /End of turn/.test(e.message.alert.message[0])) {
      turns += 0.5;
    }
  });
  return Math.ceil(turns);
};


const createGameSummary = (events) => {
  const playerA = events[0].message[0].name;
  const playerB = events[1].message[0].name;

  const playerADeckEvent = events.find(e => {
    return e.message[1] === ' is playing as the Archon: ';
  });
  const playerADeckID = playerADeckEvent.message[2].link.replace('https://www.keyforgegame.com/deck-details/', '');
  const playerADeckName = playerADeckEvent.message[2].label;

  const playerBDeckEvent = events.find(e => {
    return e.message[1] === ' is playing as the Archon: ' && e !== playerADeckEvent;
  });
  const playerBDeckID = playerBDeckEvent.message[2].link.replace('https://www.keyforgegame.com/deck-details/', '');
  const playerBDeckName = playerBDeckEvent.message[2].label;

  const winnerName = events.find(e => {
    if (e.message && e.message.alert && e.message.alert.message[1] === ' has won the game') {
      return e;
    }
  }).message.alert.message[0].name;

  let loserName;
  let loserDeckID;
  let loserDeckName;
  let winnerDeckID;
  let winnerDeckName;

  if (winnerName === playerA) {
    winnerDeckID = playerADeckID;
    winnerDeckName = playerADeckName;
    loserName = playerB;
    loserDeckID = playerBDeckID;
    loserDeckName = playerBDeckName;
  } else {
    winnerDeckID = playerBDeckID;
    winnerDeckName = playerBDeckName;
    loserName = playerA;
    loserDeckID = playerADeckID;
    loserDeckName = playerADeckName;
  }

  const winner = {
    name: winnerName,
    deckID: winnerDeckID,
    deckName: winnerDeckName,
    cardsDrawn: -1,// getCardsDrawnForPlayer(winnerName, events),
    cardsArchived: -1,
    cardsDiscarded: getCardsDiscardedForPlayer(winnerName, events),
    artifactsPlayed: getCardTypePlayedForPlayer(winnerName, 'artifact', events),
    creaturesPlayed: getCardTypePlayedForPlayer(winnerName, 'creature', events),
    actionsPlayed: getCardTypePlayedForPlayer(winnerName, 'action', events),
    aemberGainedFromCardPips: getAemberGainedFromPipsForPlayer(winnerName, events),
    aemberGainedFromReaping: getAemberGainedFromReapForPlayer(winnerName, events),
    aemberGainedFromStealing: -1,// getAemberGainedFromStealingForPlayer(winnerName, events),
    aemberGainedFromEffects: -1, // from cards like Warchest, trubaru
    aemberCaptured: getAemberCaptured(winnerName, events),
    aemberLost: getAemberLost(winnerName, events),
    aemberTotalGained: getTotalAemberGained(winnerName, events),
    didMulligan: checkMulligan(winnerName, events),
    chainsStarting: getStartingChains(winnerName, events),
    chainsGained: getChainsGained(winnerName, events),
  };
  Object.assign(winner, getTurnsPerHouseForPlayer(winnerName, events));

  const loser = {
    name: loserName,
    deckID: loserDeckID,
    deckName: loserDeckName,
    cardsDrawn: -1,// getCardsDrawnForPlayer(loserName, events),
    cardsArchived: -1,
    cardsDiscarded: getCardsDiscardedForPlayer(loserName, events),
    artifactsPlayed: getCardTypePlayedForPlayer(loserName, 'artifact', events),
    creaturesPlayed: getCardTypePlayedForPlayer(loserName, 'creature', events),
    actionsPlayed: getCardTypePlayedForPlayer(loserName, 'action', events),
    aemberGainedFromCardPips: getAemberGainedFromPipsForPlayer(loserName, events),
    aemberGainedFromReaping: getAemberGainedFromReapForPlayer(loserName, events),
    aemberGainedFromStealing: -1,// getAemberGainedFromStealingForPlayer(loserName, events),
    aemberGainedFromEffects: -1, // from cards like Warchest, trubaru
    aemberCaptured: getAemberCaptured(loserName, events),
    aemberLost: getAemberLost(loserName, events),
    aemberTotalGained: getTotalAemberGained(loserName, events),
    didMulligan: checkMulligan(loserName, events),
    chainsStarting: getStartingChains(loserName, events),
    chainsGained: getChainsGained(loserName, events),
  };
  Object.assign(loser, getTurnsPerHouseForPlayer(loserName, events));

  const turns = getTurns(events);

  return {
    winner,
    loser,
    turns,
  };
};

module.exports = createGameSummary;
