/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/


  const firebaseConfig = {
  apiKey: "AIzaSyB7m4WEx4-5Gh7XnvDNiuKlFLuNh4ugwnE",
  authDomain: "nia-jobanputra-12comp.firebaseapp.com",
  databaseURL: "https://nia-jobanputra-12comp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nia-jobanputra-12comp",
  storageBucket: "nia-jobanputra-12comp.firebasestorage.app",
  messagingSenderId: "983754689901",
  appId: "1:983754689901:web:4147aa8e330a08e4bc9e64"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);
