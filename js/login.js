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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  var displayName = user.displayName;
  var email = user.email;
  var uid = user.uid;
  var emailVerified = user.emailVerified;
  // var providerData = user.providerData;
  // var photoURL = user.photoURL;
  // var isAnonymous = user.isAnonymous;
  // User is logged in
  } else {
  // User is signed out.
  // ...
  }
  });

function login(){
    var userEmail = document.getElementById("email_f").value;
    var userPass = document.getElementById("pass_f").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(){
      location.href = "animalPage.html";
        })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);



    });
}

function register(){
  // var check1 = jQuery("#first_name").val();
  // var check2 = $("#last_name").val();
  
  var userEmail = document.getElementById("email_su").value;
  var userPass = document.getElementById("pass_su").value;
  var Usersname = document.getElementById("first_name").value;
  var usersFamilyname = document.getElementById("last_name").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function(){
    regUser(userEmail,Usersname,usersFamilyname);
    location.href = "animalPage.html";
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);



  });
}

// var root = firebase.database().ref();
//     var animals = root.child('animals');
//     var temp=animals.push();
function regUser(userEmail,Usersname,usersFamilyname) {
  console.log("hello from line 77");
  var root = firebase.database().ref();
  var usersRef = root.child('users');
  var node = usersRef.push();
  console.log("hello from line 81");
  node.set({
      email:userEmail,
      fname: Usersname,
      lname: usersFamilyname,
      
  });
  // alert(root +'\n'+ usersRef);
}




    $(document).ready(function(){
      $("#signupbtn").click(function(){
        $("#login_div").hide();
        $("#signup_form").show();
      //  $("#first_name").fadeIn();
      //  $("#last_name").fadeIn();
      //  $("#email_su").fadeIn();
      //  $("#pass_su").fadeIn();
      //  $("#regButton").fadeIn();
      //  $("#backB").fadeIn();

        
      });
    });


    function goback(){
      location.href="index.html"
  }
   
function logout(){
    firebase.auth().signOut();
    location.href="index.html"
}

