{
  const db = new Firebase(config.FIREBASE_API);

  $(document).ready(() => {
    db.child('games').on('value', (data) => {
      if (!data.val()) return;
      const games = data.val();
      const gameKeys = Object.keys(games);
      const gameList = $('#game-list');

      gameList.html('');
      for (let i = 0; i < gameKeys.length; i++) {
        const gameDiv = $('\
          <div>\
            <h1>Game ' + games[gameKeys[i]].gameNumber + '</h1>\
            <p>Players</p>\
            <ol></ol>\
          </div>');
        const players = games[gameKeys[i]].players;
        for (let j = 0; j < Object.keys(players).length; j++) {
          const playerLi = $('<li>' + players[j] + '</li>');
          gameDiv.find('ol').append(playerLi);
        }
        gameList.append(gameDiv);
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
