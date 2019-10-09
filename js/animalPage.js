function Check(){
    alert("hello");
}
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


  var currentUser, currentUserEmail;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
        currentUserEmail = user.email;
        currentUser = user;
        
        document.getElementById("userplace").innerHTML = "welcome " + currentUserEmail;
    } else {
        location.href = "index.html"
    }
});

var board = document.getElementById("main_board");
 board.classList.add("card-columns");
//board.classList.add("card-deck");
var DBanimalO = database.ref().child('animals');

DBanimalO.on('child_added',snap=>{
  // BuildBoard();
    console.log((Object.keys(snap.val())).length );
    var card_div = document.createElement('div');
    var animalName = snap.val().name;
    var description = snap.val().description;
    var photopath = snap.val().photo;
    // card_div.innerText= snap.val().type;
    card_div.id=snap.key;
    card_div.classList.add("card");
    //card_div.classList.add("col-sm-4");
    var card_img = document.createElement('img');
    card_img.classList.add("card-img-top");
    var in_div = document.createElement('div');
    var headName = document.createElement('h4');
    headName.classList.add("card-title");
    var desc = document.createElement('p');
    desc.classList.add("card-text")
    //var contact = document.createElement('a');
    var contactB = document.createElement('button');
    $(contactB).id="contactbtn"
    $(contactB).addClass("btn btn-primary ");
    $(contactB).prepend('<i class="fa fa-fw fa-envelope"></i>  Contact my current owner');
    $(contactB).attr('onclick','send("'+card_div.id+'")');
    in_div.classList.add("container");
    card_img.src=photopath;
    headName.innerText = animalName+ '\n';
    desc.innerText = description;
    //contact.innerText = "contact: " + snap.val().user_email;
    card_div.appendChild(card_img);
    in_div.appendChild(headName);
    in_div.appendChild(desc);
    //in_div.appendChild(contact);
    in_div.appendChild(contactB);
    card_div.appendChild(in_div);
    board.appendChild(card_div);
});

DBanimalO.on('child_removed',snap=>{
    const toRemove = document.getElementById(snap.key);
    toRemove.remove();
});

DBanimalO.on('child_changed', snap=>{
    const toChange = document.getElementById(snap.key);
    toChange.innerText = snap.val();
    location.reload(); 
});
// function BuildBoard(){
//     firebase.database().ref('animals').once('value').then(function(snap){
//         var PostObject = snap.val();
//      var keys = Object.keys(PostObject);
//      console.log(keys.length);
//      var currRow;
//      for(i=0;i<keys.length;i++){
//          var currOb = PostObject[keys[i]];
//          console.log(currOb);
//          if(i%4 ==0){
//             currRow = document.createElement("div");
//             $(currRow).addClass("row");
//             $("#main_board").append(currRow);
//          }
//           var photopath = currOb.photo;//
//          var card_div = document.createElement('div');
//          $(card_div).addClass("col-lg-4");
//          var card_img = document.createElement('img');
//          $(card_img).addClass("col-lg-4");
//          card_img.src=photopath;
//          card_div.classList.add("card-body");
//          var in_div = document.createElement('div');
//          $(in_div).addClass("container");
//          var headName = document.createElement('h4');
//          $(headName).html(currOb.name);
//          var desc = document.createElement('p');
//          $(desc).html(currOb.description);
//          $(card_div).append(card_img);
//          $(in_div).append(headName);
//          $(in_div).append(desc);
//          $(card_div).append(in_div);
//          $(currRow).append(card_div);
//      }
        
        
    
// });
     
// }


   





function AddnewAnimal(){
    location.href = "animalForm.html"
    // $(document).ready(function(){
    //     $("#addnewAnimal").click(function(){
    //       $("#aniForm").show();
    //     });
    //   });

}

$(document).ready(function(){				
    $("#factBtn").click(function(){
        $.ajax({
        //  url: "http://api.icndb.com/jokes/random/",
        url:"https://dog.ceo/api/breeds/image/random",
        type: "get",
        success: function(data){
            console.log(data);
        // $("#photoBooth").text(data.message);
            $("#photoBooth").attr('src',data.message);
            // var link= $("#photoBooth").attr('src').split("/");
            // var breed = link[4];
            // $("#breedname").text(breed);
        }, 
        error: function(err){
        console.log(err);
        }
        }).then(function(){
             var link= $("#photoBooth").attr('src').split("/");
            var breed = link[4];
            $("#breedname").text(breed);
        });
});
});

function send(cardid) {
    console.log(cardid);
    firebase.database().ref('animals').once('value').then(function(snap){
        var PostObject = snap.val();
        var keys = Object.keys(PostObject);
        var chosenCard=keys.indexOf(cardid);
        var currOb = PostObject[keys[chosenCard]];
        var from = currentUserEmail;
        var to   = currOb.user_email;
        var link = 'mailto:'+to+'?subject=Message from '
                  +from;
                  
         window.location.href = link;
        
    });
//    for(var i=0;i<Object.keys(DBanimalO).length;i++){
//        console.log(DBanimalO.keys[i]);
//    }
    //console.log(Object.DBanimalO.keys.length);
    // for(i=0;i<DBanimalO.keys.length)
    

    // var link = 'mailto:email@example.com?subject=Message from '
    //          +document.getElementById('email').value
    //          +'&body='+document.getElementById('email').value;
    // window.location.href = link;
}



function logout(){
    firebase.auth().signOut();
}
