import { initializeApp } from 'firebase/app';
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBQJTv2jCt67feblL9iF4s-724naADa6rg",
  authDomain: "blue-ocean-f7701.firebaseapp.com",
  projectId: "blue-ocean-f7701",
  storageBucket: "blue-ocean-f7701.appspot.com",
  messagingSenderId: "9643299705",
  appId: "1:9643299705:web:d7fc410a8e773c138855a8",
  // measurementId: "${config.measurementId}"
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
