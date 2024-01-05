import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, collection, addDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBt8K9TpvcCO2NsjQw4EmmXNkT7yJmQPhY",
    authDomain: "dave-shop-2aec9.firebaseapp.com",
    projectId: "dave-shop-2aec9",
    storageBucket: "dave-shop-2aec9.appspot.com",
    messagingSenderId: "814753164299",
    appId: "1:814753164299:web:9bf71aaf8e1294fecaab0e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function registerUser(email, password, userInfo) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user information in Firestore
        await addDoc(collection(db, "users"), {
            id: user.uid,
            ...userInfo
        });


        console.log("User registered successfully!");
    } catch (error) {
        console.error("Error registering user:", error);
        // Handle registration errors here (e.g., invalid email, weak password, etc.)
    }
}

async function signInUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log("User signed in successfully:", user);
      // Handle successful sign-in (e.g., redirect to a different route)
    } catch (error) {
      console.error("Error signing in user:", error);
      // Handle sign-in errors (e.g., display error message to user)
    }
  }

export { db, app, auth, registerUser, signInUser }