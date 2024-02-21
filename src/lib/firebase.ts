import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmr-iOLQt_ORR_XJk08BiO6zZBvelcPps",
  authDomain: "creative-agency-blog.firebaseapp.com",
  projectId: "creative-agency-blog",
  storageBucket: "creative-agency-blog.appspot.com",
  messagingSenderId: "973938195327",
  appId: "1:973938195327:web:636b10d080eaedea53384a",
};

// // Initialize Firebase

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
