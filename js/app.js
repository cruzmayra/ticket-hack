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
