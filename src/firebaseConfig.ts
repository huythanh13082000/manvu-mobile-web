import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyCEpUlqwJAjo9dCMF07-adJFYDy7zR9Pfc',
  authDomain: 'manvu-6643d.firebaseapp.com',
  projectId: 'manvu-6643d',
  storageBucket: 'manvu-6643d.appspot.com',
  messagingSenderId: '76664658448',
  appId: '1:76664658448:web:a243a006dfd3b33485c895',
  measurementId: 'G-KXD9GXH83Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

