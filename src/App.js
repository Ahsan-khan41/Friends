import React, { useState } from 'react';
import 'antd/dist/antd.css';
import AppRouter from './AppRouter/AppRouter'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CurrentUserContext from '../src/ContextAPI/CurrentUserContext'
import { doc, onSnapshot } from "firebase/firestore";
import { fireDB } from './firebaseConfig';


function App() {

  const [currentUser, setCurrentUser] = useState({});

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      // console.log(user.uid);
      onSnapshot(doc(fireDB, "users", `${uid}`), (doc) => {
        const userData = doc.data();
        user.profileUrl = userData.profileUrl;
        user.displayName = userData.name;
        //console.log(user);
      })

      setCurrentUser(user);
    } else {
      // User is signed out
      console.log('user signed out!');
    }
  });

  return (
    <div className="center">
      <CurrentUserContext.Provider value={currentUser}>
        <AppRouter />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
