{
  const db = new Firebase(config.FIREBASE_API);
  const userAuthToken = sessionStorage.getItem('spadesLiveUserAuth');

  if (userAuthToken) {
    db.authWithCustomToken(userAuthToken, (err, authData) => {
      if (err) {
        window.location.replace('login.html');
      } else {
        $('body').removeClass('hidden');
      }
    });
  } else {
    window.location.replace('login.html');
  }
}
