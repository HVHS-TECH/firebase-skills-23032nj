/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

const HTML_OUTPUT = document.getElementById("databaseOutput");

/**************************************************************/
// helloWorld()
// Demonstrate a minimal write to firebase
// This function replaces the entire database with the message "Hello World"
// 
// This uses the set() operation to write the key:value pair "message":"Hello World"
// The ref('/') part tells the operation to write to the base level of the database "/"
// This means it replaces the whole database with message:Hello World
/**************************************************************/

//basic write
function helloWorld(){
  console.log("Running helloWorld()")
  firebase.database().ref('/').set(
    {
      message: 'Kia ora'
    }
  )
}

function goodbyeWorld(){
  console.log("Running goodbyeWorld()")
  firebase.database().ref('/').set(
    {
      message: 'Ka kite ano'
    }
  )
}

//basic read
function fb_logDatabaseRead() {
  console.log("Reading message");
  firebase.database().ref("/").child("message").once("value", display, fb_readError);
  console.log("Leaving fb_logDatabaseRead");
}

function display(snapshot) {
  var dbData = snapshot.val();
  if (dbData == null) { //if there is no data, dbData will be null
      console.log('There was no record when trying to read the message');
    }
    else {
      console.log("The message is: " + dbData)
      HTML_OUTPUT.innerHTML += "The message is: " + dbData
    }
}

function fb_readError(error) {
  console.log("There was an error reading the message");
  console.error(error);
}

//read listener
function fb_readListener() {
  console.log("Read Listener");
  firebase.database().ref('/message').on('value', fb_logDatabaseRead, fb_readError)
}

//complex write 
let user = "Nia";
let score = "50";

function highscoreTable() {
 firebase.database().ref('/').set (
  {
    game1: {
      users: {
        Nina: 100,
        Emma: 200,
        Jess: 150,
        Adreeta: 90, 
      }
    }
  }
 );
}

function addingUserScore() {
  firebase.database().ref('/game1/users/Amelia/').set(250);
  firebase.database().ref('/game1/users/Adreeta/').set(900);
  firebase.database().ref('/game1/users/'+user).set(score);
}

//reading a path
function highscoreTableTwo() {
 highscoreTable = {
   highScores: {
     game1: {
         Olly: 300,
         Nina: 100,
         Emma: 200, 
      },
      game2: {
          Olly: 3000,
          Nina: 1000, 
          Emma: 2000, 
      }
    }
  }
   firebase.database().ref('/').set(highscoreTable)
}
 

function fb_readHighScores() {
  console.log("Reading high scores");
  firebase.database().ref('/highScores/game1').once('value', displayOneScore, fb_readError);
  firebase.database().ref('/highScores').once('value', displayHighScores, fb_readError);
}

function displayOneScore(snapshot) {
  let gameOneData = snapshot.val();
  if (gameOneData == null) { //if there is no data, dbData will be null
      console.log('There was no record when trying to read the message');
    }
    else {
      console.log("One score:")
      console.log("Nina got " +gameOneData["Nina"]+" points")
      HTML_OUTPUT.innerHTML += "Nina got " +gameOneData["Nina"]+" points"

    }
}

function displayHighScores(snapshot) {
  let highScoresData = snapshot.val();
  if (highScoresData == null) {
    console.log('There was no record when trying to read the message');
  }
  else {
    console.log("High score table:")
    console.log(highScoresData)
    HTML_OUTPUT.innerHTML += highScoresData 
  }
}

//sorting records (using same high score table in reading a path)
function fb_readSortedHighScores() {
  console.log("Reading sorted high scores");
  firebase.database().ref('/highScores/game1').orderByValue().limitToLast(3).once('value', displaySortedHighScores, fb_readError);
}

function displaySortedHighScores(snapshot) {
  snapshot.forEach(showOneScore)
}

function showOneScore(child) {
  //console.log(child.val());
  console.log(child.key+" got "+ child.val()+" points");
  HTML_OUTPUT.innerHTML += "<p>" + child.key+" got "+ child.val()+" points </p>"

}

function fb_readSortedNames() {
  console.log("Reading sorted names");
  firebase.database().ref('/highScores/game1').orderByKey().limitToLast(3).once('value', displaySortedNames, fb_readError);
}

function displaySortedNames(snapshot) {
  snapshot.forEach(showOneName)
}

function showOneName(child) {
  //console.log(child.val());
  console.log(child.key+" got "+ child.val()+" points");
  HTML_OUTPUT.innerHTML += "<p>" + child.key+" got "+ child.val()+" points </p>"
}

//login with google

function fb_popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user; //save the user details object to a global variable
    console.log("User has logged in")
  });
}