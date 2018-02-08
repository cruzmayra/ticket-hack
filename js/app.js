// función que centraliza al resto de las funciones
function loadPage() {
  loadSplashView();
  loadMainView();
  $('.login-facebook').click(providerFacebook);
  $('.login-google').click(loginGoogle);
  
 }

//Función que hace desaparecer la imagen principal
function loadSplashView() {
  setTimeout(function() {
      $("#view-splash").fadeOut(1500);
    },2000);
};

//Función que hace aparecer la siguiente pantalla
function loadMainView() {
    setTimeout(function() {
      $("#second-section").fadeIn(1500);
    },2000);
};

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBF3Q7Sg2rKOCriKyo6kCb20d4a7C0S-_w",
  authDomain: "ticket-hack.firebaseapp.com",
  databaseURL: "https://ticket-hack.firebaseio.com",
  projectId: "ticket-hack",
  storageBucket: "ticket-hack.appspot.com",
  messagingSenderId: "642426168856"
};

firebase.initializeApp(config);

//llamar esta función al dar click sobre el botón correspondiente
function providerFacebook(e){
  e.preventDefault();
  var provider = new firebase.auth.FacebookAuthProvider();
  authenticationWithFacebook(provider);
}

//función que autentifica el acceso del usuario utilizando su cuenta de FB
function authenticationWithFacebook(provider) {
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(result);
  window.location.href = 'views/home.html';
  saveDataUser(user);
}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});
}

var database = firebase.database();

// función para almacenar al usuario en la base de datos
function saveDataUser(user) {
  var ticketHackUser = {
    uid: user.uid,
    name : user.displayName,
    email : user.email,
    photo: user.photoURL
  }
  firebase.database().ref('ticket-hack-user/' + user.uid)
  .set(ticketHackUser);
}

$(document).ready(loadPage);

//autenticacion con Google
function loginGoogle(){

  function newLoginHappened(user){
    if(user){
      //User is signed in
      app(user);
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }
    firebase.auth().onAuthStateChanged(newLoginHappened);
}

function app(user){
  //user.displayName;
  //user.email;
  //user.photoURL;
  //user.uid is unique

  document.getElementById("clientName").innerHTML = user.displayName;
}








