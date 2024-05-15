import * as admin from 'firebase-admin';
import * as fs from "fs";

// Reads contents of service account JSON private key
const serviceAccount = JSON.parse(
    fs.readFileSync(import.meta.env.PRIVATE_KEY_PATH, 'utf8')
);

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  
  export const auth = admin.auth();
  export const db = admin.firestore();