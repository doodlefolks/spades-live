{
  const db = new Firebase(config.FIREBASE_API);

  function authUser (email, password) {
    db.authWithPassword({
      "email": email,
      "password": password
    }, (err, authData) => {
      if (err) {
        alert('Login failed');
      } else {
        sessionStorage.setItem('spadesLiveUserAuth', authData.token);
        sessionStorage.setItem('spadesLiveUserName', email);
        window.location.replace('index.html');
      }
    });
  };

  $(document).ready(() => {
    $('#login-submit').click((e) => {
      e.preventDefault();
      const email = $('#login-email').val();
      const password = $('#login-password').val();
      authUser(email, password);
    });

    $('#new-user').click((e) => {
      e.preventDefault();
      $('#login-form').addClass('hidden');
      $('#new-user-form').removeClass('hidden');
      $('#new-login-submit').click((e) => {
        e.preventDefault();
        const email = $('#new-login-email').val();
        const password = $('#new-login-password').val();
        const rating = 2000;
        const passwordConfirm = $('#new-login-password-confirm').val();
        if (password === passwordConfirm) {
          db.createUser({
            email: email,
            password: password
          }, (err, userData) => {
            if (err) {
              switch (err.code) {
                case "EMAIL_TAKEN":
                  alert("The new user account cannot be created because the email is already in use.");
                  break;
                case "INVALID_EMAIL":
                  alert("The specified email is not a valid email.");
                  break;
                default:
                  alert("Error creating user");
                  console.log(err);
              }
            } else {
              db.child('users').child(userData.uid).set({
                email,
                rating
              }, () => {
                alert("User created successfully");
                authUser(email, password);
              });
            }
          });
        } else {
          alert('Passwords do not match');
        }
      });
    });

    $('#forgot-password').click(function (e) {
      e.preventDefault();
      var email = $('#login-email').val();
      db.resetPassword({
        email: email
      }, function (error) {
        if (error) {
          switch (error.code) {
            case "INVALID_USER":
              alert("The specified user account does not exist.");
              break;
            default:
              alert("Error resetting password:", error);
          }
        } else {
          alert("Password reset email sent successfully!");
        }
      });
    });
  });
}
