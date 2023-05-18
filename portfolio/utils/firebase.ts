import { initializeApp } from "@firebase/app";
import { getDoc, getFirestore } from "@firebase/firestore";
import firebase from "firebase/compat";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5k9RbLj4sexsoRb4W1w_8wWggxcZQ2es",
  authDomain: "task-41e05.firebaseapp.com",
  projectId: "task-41e05",
  storageBucket: "task-41e05.appspot.com",
  messagingSenderId: "482137951796",
  appId: "1:482137951796:web:1dab3385fd607afab28461",
  measurementId: "G-VCJ0MVKSX9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

async function getUserExpenses(userId) {
  const expensesRef = collection(db, "expenses");
  const userExpensesQuery = query(expensesRef, where("userId", "==", userId));
  const expensesSnapshot = await getDocs(userExpensesQuery);

  const expenses = [];
  expensesSnapshot.forEach((doc) => {
    expenses.push({ id: doc.id, ...doc.data() });
  });

  return expenses;
}

async function getMaxBudget(userId) {
  const budgetRef = doc(db, "budgets", userId);
  const budgetSnap = await getDoc(budgetRef);

  if (budgetSnap.exists()) {
    return budgetSnap.data().maxBudget;
  } else {
    return null;
  }
}

async function setMaxBudget(userId, maxBudget) {
  const budgetRef = doc(db, "budgets", userId);
  await setDoc(budgetRef, { maxBudget });
}

const singInWithGoogle = () => {
  console.log("signing in with google");
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(user, "succesfully signed in." + token);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error.code);
      console.log(error);
    });
};

const logout = () => {
  console.log("loggin out");
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export {
  db,
  auth,
  singInWithGoogle,
  logout,
  signInWithPopup,
  GoogleAuthProvider,
  getUserExpenses,
  setMaxBudget,
  getMaxBudget
};
