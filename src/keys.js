const getKeysForPlayer = (player, events) => {
  const update = [].concat(events).reverse().find(e => {
    return e.type === 'PLAYER_STATE_UPDATE';
  });
  return update.players[player].keys;
};

module.exports = {
  getKeysForPlayer,
};
