
var firebaseConfig = {
    apiKey: "AIzaSyAfUdRzKw6VHGja6Ll0RwHZYvD4taLilU4",
    authDomain: "web-final-da931.firebaseapp.com",
    databaseURL: "https://web-final-da931.firebaseio.com",
    projectId: "web-final-da931",
    storageBucket: "web-final-da931.appspot.com",
    messagingSenderId: "362061910057",
    appId: "1:362061910057:web:4cf1adbf5f52d524"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var self = this;


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    var displayName = user.displayName;
    var email = user.email;
    var uid = user.uid;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var providerData = user.providerData;
    //document.getElementById("userplace").innerHTML = "welcome " + email ;
    $("#userplace").text("welcome " + email);
    // User is logged in
    } else {
    // User is signed out.
    location.href = "index.html"
    }
    });



 function logout(){
    firebase.auth().signOut();
}


function send(){

    alert('thank you for your message! you may have helped to save another animal');
    location.reload();

}