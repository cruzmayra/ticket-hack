// función que centraliza al resto de las funciones
function loadPage() {
  loadSplashView();
  loadMainView();
  $('.login-facebook').click(providerFacebook);
  $('.login-google').click(loginGoogle);
  dataApi();
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



//autenticacion con Google
function loginGoogle(){
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
    app(user);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}

function app(user){
  //user.displayName;
  //user.email;
  //user.photoURL;
  //user.uid is unique

  document.getElementById("clientName").innerHTML = user.displayName;
}


function dataApi() {
    $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?countryCode=MX&apikey=PjwwXnpkUrZt7R0wCNGZli5VGDAsZmSJ" ,
        async:true,
        dataType: "json",
        success: function(json) {
                    console.log(json);
                   var event = json._embedded.events
                console.log(event);
                 
                   for(var i=0; i < event.length; i++ ){
                    var nameEvent= event[i].name; //nombre del evento
                    var infoEvent = event[i].info; //descripcion del evento 
                    var datesObject= event[i].dates;
                    var dateEvent = datesObject.start.localDate; //fecha del evento
                    var timeEvent = datesObject.start.localTime; //hora del evento
                    
                    printEvents(nameEvent, infoEvent, dateEvent, timeEvent);
                    
                    
                   }

               
                
                 },
        error: function(xhr, status, err) {
                    // This time, we do not end up here!
                 }

      });
    
}

function printEvents(nameEvent,infoEvent,dateEvent,timeEvent){
  //creando elementos dimamicamnte//
  var $eventBox = $('<div/>').addClass('event col-xs-12 card');
  var $nameEventBox = $('<h4/>').addClass('name-event');
  var $imgEventBox = $('<img/>').attr({
      class:'img-event band',
      src: "../assets/images/event.jpg",
     });
     

  var $infoEventBox = $('<p/>').addClass('info-event');
  var $dateEventBox = $('<span/>').addClass('date-event');
  var $space = $('<br/>')
  var $timeEventBox = $('<span/>').addClass('time-event');

  // Agregando texto dinamicamente 

  $nameEventBox.text(nameEvent);
 
  $infoEventBox.text(infoEvent);
  $dateEventBox.text("Fecha:" + " " + dateEvent);
  $timeEventBox.text("Hora:" + " " + timeEvent);

   // Agregando a contenedor

   $eventBox.append($nameEventBox);
   $eventBox.append($imgEventBox);
   $eventBox.append($infoEventBox);
   $eventBox.append($dateEventBox);
   $eventBox.append($space);
   $eventBox.append($timeEventBox);
   $('.events-container').append($eventBox);



}

$(document).ready(loadPage);