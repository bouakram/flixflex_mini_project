import { initializeApp } from 'firebase/app';
import { getAuth, NextOrObserver, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
 // put your conf here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_DB = getFirestore(app);

export const signOutUser = async () => {
  return await signOut(FIREBASE_AUTH);
};

export const onAuthStateChangedListener = (cb: NextOrObserver<User>) => {
  onAuthStateChanged(FIREBASE_AUTH, cb);
};
