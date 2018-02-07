//Función que hace desaparecer mi imagen principal
$(document).ready(function() {
  setTimeout(function() {
      $("#view-splash").fadeOut(1500);
    },2000);
});

//Función que hace aparecer la siguiente pantalla
$(document).ready(function() {
    setTimeout(function() {
      $("#second-section").fadeIn(1500);
    },2000);
});

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCTW_CuGxkifIrSOyH3aHrDhvouWe2Mt0s",
    authDomain: "sykkel-38222.firebaseapp.com",
    databaseURL: "https://sykkel-38222.firebaseio.com",
    projectId: "sykkel-38222",
    storageBucket: "sykkel-38222.appspot.com",
    messagingSenderId: "100214826901"
  };
  firebase.initializeApp(config);

$('#buttonGoogle').click(function(e){
  e.preventDefault();
  authGoogle();
})
function authGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  authentication(provider);
}

function authentication(provider){
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(result);
    localStorage.setItem('userName', user.displayName);
    localStorage.setItem('userPhoto', user.photoURL);
    window.location.href = '../views/perfil.html';


  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.mail;
    var credential = error.credential;
});
}

function loadNewsfeedPage() {
  paintDataUser();
}

function paintDataUser() {
  var userName = localStorage.getItem('userName');
  var userPhoto = localStorage.getItem('userPhoto');
  $('.user-name').text(userName);
  $('.user-photo').attr('src',userPhoto);
}
