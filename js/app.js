/*---------- función que centraliza al resto de las funciones ----------*/
function loadPage() {
  loadSplashView();
  loadMainView();
  $('.login-facebook').click(providerFacebook);
  $('.login-google').click(loginGoogle);
  $('.publicar-busqueda').click(saveSearchingPost);
  paintUserPost();
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

var loggedUser = localStorage.getItem('userId');

/*---------- función que autentifica el acceso del usuario utilizando su cuenta de FB ----------*/
function authenticationWithFacebook(provider) {
  firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;
  var user = result.user;
  // console.log(user);
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
  firebase.database().ref('ticket-hack-user/' + user.uid)
  .once('value').then(function(snapshot){
   var userData = snapshot.val();
   var updatedUserData = {};
     updatedUserData.uid = userData && userData.uid || user.uid;
     updatedUserData.name = userData && userData.name || user.displayName;
     updatedUserData.email = userData && userData.email || user.email;
     updatedUserData.photo = userData && userData.photo || user.photoURL;
     updatedUserData.posts = userData && userData.posts || []
   firebase.database().ref('ticket-hack-user/' + user.uid)
   .set(updatedUserData)
   localStorage.setItem('userId', user.uid);
   console.log(localStorage.getItem('userId'));
  })

}

/*---------- función para leer los post guardados del usuario loggeado ----------*/
function paintUserPost() {
  var loggedUser = localStorage.getItem('userId');
  console.log(loggedUser);
  var postsRef = firebase.database().ref('ticket-hack-user/' + loggedUser + '/posts');
  postsRef.on('value', function(snapshot){

    var userPosts = snapshot.val();
  })
}

/*---------- función para almacenar el nuevo post del usuario logeado ----------*/
function saveSearchingPost() {
  var loggedUser = localStorage.getItem('userId');
  var newpost = {
    text: $('.searching-textarea').val(),
    timestamp: Date.now(),
    type: 'searching',
    userId: loggedUser
  }

  var newPostKey = firebase.database().ref('ticket-hack-user/' + loggedUser + '/posts/').push().key;

  var updates = {};
  updates['ticket-hack-user/' + loggedUser + '/posts/' + newPostKey] = newpost;
  updates['ticket-hack-posts/' + newPostKey] = newpost;

  return firebase.database().ref().update(updates);
}

/*---------- función para pintar en el html los post de busqueda ----------*/
function paintSearchingPost(newpost){
  console.log(newpost.userPost);
}

$(document).ready(loadPage);
