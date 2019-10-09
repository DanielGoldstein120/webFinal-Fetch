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

    // const root = firebase.database().ref();
    //     var usersRef = root.child('users');
    //     var node = usersRef.push();
function add(){
    var user = firebase.auth().currentUser.uid;
    console.log(user);
    var root = firebase.database().ref();
    var animals = root.child('animals');    
    var temp=animals.push();
    var filepath= null;
    if(self.image_url!= null){
        filepath=self.image_url;
    }
    temp.set({
        name:$("#animalname").val(),
        type:$("#animalType").val(),
        description:$("#animal_desc").val(),
        userid: user ,
        user_email: firebase.auth().currentUser.email,
        photo : filepath
    });
    
    window.location.href = "animalPage.html";

}

//Select a file: <input type="file" name="myFile" id="picUpload">
$("#picUpload").on("change" , function(event){
    selectedFile = event.target.files[0];
    console.log(selectedFile);
    fileUpload();
});
function fileUpload(){
    
        var filename = selectedFile.name;
    var StorageRef = firebase.storage().ref('/animalImages/' + filename);
    var uploadTask = StorageRef.put(selectedFile);
    
        uploadTask.on('state_changed', function(snapshot){
    
        }, function(error){
    
        }, function(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                self.image_url = downloadURL;
                console.log('File available at', downloadURL);
              });
        });
   

}



    
function back(){
    location.href="animalPage.html";
}
function logout(){
    firebase.auth().signOut();
}