import { initializeApp } from "firebase/app";
import { 
  initializeAppCheck, 
  ReCaptchaV3Provider
} from "firebase/app-check";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-OQ7-ucguAojMBqOsab3Ph75HuOTQ__E",
  authDomain: "space-41efa.firebaseapp.com",
  projectId: "space-41efa",
  storageBucket: "space-41efa.appspot.com",
  messagingSenderId: "954974726042",
  appId: "1:954974726042:web:0c85a85456dfe738a83c23"
};

const app = initializeApp(firebaseConfig);

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Lc94GojAAAAAFS2qzz00aez2q4mWF3E27D5xNb5"),
  isTokenAutoRefreshEnabled: true
});

export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    let user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (err) {
    console.error(err);
  }
};

export const registerWithEmailAndPassword = async (displayName: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      displayName: displayName,
      authProvider: "local",
      email: email,
    });

    await updateProfile(user, {
      displayName: displayName,
    });

    await sendEmailVerification(user);

  } catch (err) {
    console.error(err);
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => {
  signOut(auth);
};