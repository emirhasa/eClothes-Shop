import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCpg5q6QtKHYz3p5O7vkWXJ5jINEXtIMPs",
    authDomain: "crown-db-c2825.firebaseapp.com",
    databaseURL: "https://crown-db-c2825.firebaseio.com",
    projectId: "crown-db-c2825",
    storageBucket: "crown-db-c2825.appspot.com",
    messagingSenderId: "252227763561",
    appId: "1:252227763561:web:620ad5c76c829f6c7b51f8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
}
 
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;