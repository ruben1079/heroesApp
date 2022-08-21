const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.welcomeuser = functions.auth.user().onCreate( (user) =>{
  console.log("Nuevo usuario creado con el correo: "+user.email);
});

// exports.welcomeuser = functions.auth.user().onCreate(async (user) =>{
// return new Promise((resolve, reject) => {
//     console.log(`Bienvenido ${user.email}`)
//     resolve(true);
// });
// });


// exports.deleteuser = functions.auth.user().onDelete(async (user) =>{
//     return new Promise((resolve, reject) => {
//         console.log(`Bye bye ${user.email}`)
//         resolve(true);
//     });
// });
