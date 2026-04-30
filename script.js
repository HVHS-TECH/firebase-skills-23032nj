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

//complex record
function highscoreTableTwo() {
 highscoreTable = {
  game1: {
    users: {
      Nina: 100,
      Emma: 200,
      Jess: 150, 
      Adreeta: 90
    }
  },
  game2: {
    users: {
      Nina: 1000,
      Emma: 2000, 
      Jess: 1500, 
      Adreeta: 900
    }
  }
 }
 firebase.database().ref('/').set(highscoreTable)
}

