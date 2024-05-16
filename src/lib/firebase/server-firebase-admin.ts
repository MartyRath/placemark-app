import * as admin from "firebase-admin";
import serviceAccount from "C:/Users/marty/Downloads/serviceAccount.json"

let auth;
let db;

try {
if (!admin.apps) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  
  auth = admin.auth();
  db = admin.firestore();
}
catch(error) {
    console.log("Firebase initialisation error", error);
}

export {auth};
export {db};