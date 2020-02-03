import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config ={
    apiKey: "AIzaSyBusEDYX_8lBp_IM7PSN4tzmYsQs5Djr5M",
    authDomain: "crwn-db-91c3f.firebaseapp.com",
    databaseURL: "https://crwn-db-91c3f.firebaseio.com",
    projectId: "crwn-db-91c3f",
    storageBucket: "crwn-db-91c3f.appspot.com",
    messagingSenderId: "1070544856384",
    appId: "1:1070544856384:web:32300c1bc97e8627fa06a5",
    measurementId: "G-CL020FYSTY"
  };


  export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth)return;

    //console.log(firestore.doc('users/'))
    const userRef = firestore.doc(`user/${userAuth.uid}`);
    const snapShot=await userRef.get();
    if(!snapShot.exists){
      const {displayName, email} =userAuth;
      const createdAt = new Date();

      try{
        await userRef.set(
          {
            displayName,
            email,
            createdAt,
            ...additionalData
          }
        )
      }catch(error){
        console.log('error creating user',error.message);

      }

    }
    return userRef;
  };


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () =>auth.signInWithPopup(provider);

  export default firebase;