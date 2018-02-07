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


  // función que centraliza al resto de las funciones
function loadPage() {
  loadSplashView();
  loadMainView();
 }

//Función que hace desaparecer mi imagen principal
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




$(document).ready(loadPage);
