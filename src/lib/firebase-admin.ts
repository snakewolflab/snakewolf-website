import admin from 'firebase-admin';
import 'dotenv/config'

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountString) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('The FIREBASE_SERVICE_ACCOUNT environment variable is not set. It is required for production builds.');
  } else {
    console.warn('FIREBASE_SERVICE_ACCOUNT env var is not set. Using default credentials for local dev.');
  }
}

// Only initialize if not already initialized
if (!admin.apps.length) {
    try {
        const serviceAccount = serviceAccountString ? JSON.parse(serviceAccountString) : undefined;
        admin.initializeApp({
            credential: serviceAccount ? admin.credential.cert(serviceAccount) : admin.credential.applicationDefault(),
        });
    } catch (e: any) {
        throw new Error(`Failed to parse FIREBASE_SERVICE_ACCOUNT or initialize Firebase Admin: ${e.message}`);
    }
}


export const firestoreAdmin = admin.firestore();
