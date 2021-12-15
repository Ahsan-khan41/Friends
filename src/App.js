import React, { useState } from 'react';
import 'antd/dist/antd.css';
import AppRouter from './AppRouter/AppRouter'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CurrentUserContext from '../src/ContextAPI/CurrentUserContext'


function App() {

  const [currentUser, setCurrentUser] =  useState({});

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // const uid = user.uid;
      // console.log(user);
      setCurrentUser(user);
    } else {
      // User is signed out

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
