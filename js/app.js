/*---------- función que centraliza al resto de las funciones ----------*/
function loadPage() {
  loadSplashView();
  loadMainView();
  $('.login-facebook').click(providerFacebook);
  $('.login-google').click(loginGoogle);
  $('.vendes').click(savePost);
  // createViewHome();
 }

/*---------- Función que hace desaparecer la imagen principal ----------*/
function loadSplashView() {
  setTimeout(function() {
      $("#view-splash").fadeOut(1500);
    },3000);
};

/*---------- Función que hace aparecer la siguiente pantalla ----------*/
function loadMainView() {
    setTimeout(function() {
      $("#second-section").fadeIn(1500);
    },3000);
};

/*---------- Initialize Firebase ----------*/
var config = {
  apiKey: "AIzaSyBF3Q7Sg2rKOCriKyo6kCb20d4a7C0S-_w",
  authDomain: "ticket-hack.firebaseapp.com",
  databaseURL: "https://ticket-hack.firebaseio.com",
  projectId: "ticket-hack",
  storageBucket: "ticket-hack.appspot.com",
  messagingSenderId: "642426168856"
};

firebase.initializeApp(config);

/*---------- llamar esta función al dar click sobre el botón correspondiente ---------- */
function providerFacebook(e){
  e.preventDefault();
  var provider = new firebase.auth.FacebookAuthProvider();
  authenticationWithFacebook(provider);
}

var logedUser = localStorage.getItem('datos');

/*---------- función que autentifica el acceso del usuario utilizando su cuenta de FB ----------*/
function authenticationWithFacebook(provider) {
  firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;
  var user = result.user;
  console.log(user);

  window.location.href = 'views/home.html';
  saveDataUser(user);
}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});
}

/*---------- autenticacion con Google ----------*/
function loginGoogle(e){
  e.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  authentication(provider);
}

function authentication(provider){
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(user);
    window.location.href = 'views/home.html';
    saveDataUser(user);
    //app(user);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}

var database = firebase.database();

/*---------- función para almacenar al usuario en la base de datos ----------*/
function saveDataUser(user) {
  var ticketHackUser = {
    uid: user.uid,
    name : user.displayName,
    email : user.email,
    photo: user.photoURL,
    post: ['go']
  }
  firebase.database().ref('ticket-hack-user/' + user.uid)
  .set(ticketHackUser)
  localStorage.setItem('datos', ticketHackUser.uid);
}


// function createViewHome() {
//   var postRef = firebase.database().ref('ticket-hack-user/' + logedUser + '/post/');
//   postRef.on('value', function(snapshot) {
//   updateStarCount(postElement, snapshot.val());
// });
// console.log(postRef);
// }

/*---------- función para almacenar el nuevo post del usuario logeado ----------*/
function savePost() {
  // console.log(logedUser);
  var newpost = {
    userPost: 'vendo boleto para el corona'
  }
firebase.database().ref('ticket-hack-user/' + logedUser + '/post/').push(newpost)
}

$(document).ready(loadPage);


// function app(user){
//   //user.displayName;
//   //user.email;
//   //user.photoURL;
//   //user.uid is unique
//
//   document.getElementById("clientName").innerHTML = user.displayName;
// }
