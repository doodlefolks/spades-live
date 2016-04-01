{
  const db = new Firebase(config.FIREBASE_API);

  $(document).ready(() => {
    db.child('games').on('value', (data) => {
      if (!data.val()) return;
      const games = data.val();
      const gameKeys = Object.keys(games);

      for (let i = 0; i < gameKeys.length; i++) {
        // Fill in the game-list div
      }
    });

    $('#new-game').click((e) => {
      db.child('games').once('value', (data) => {
        let games, gameKeys, gameNumber, players;

        players = {0: sessionStorage.getItem('spadesLiveUserName')};
        if (data.val()) {
          games = data.val();
          gameKeys = Object.keys(games);
          gameNumber = games[gameKeys[gameKeys.length - 1]].gameNumber + 1;
        } else {
          gameNumber = 0;
        }

        db.child('games').push({
          gameNumber,
          players
        });
      });
    });
  });
}
