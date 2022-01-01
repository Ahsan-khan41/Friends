import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import AppRouter from './AppRouter/AppRouter'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { fireDB } from './firebaseConfig';
import CurrentUserContext from './ContextAPI/CurrentUserContext';


function App() {

  const [firebaseAuth, setFirebaseAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseAuth(true);
        setCurrentUser(user)
        onSnapshot(doc(fireDB, "users", `${user.uid}`), (doc) => {
          setCurrentUser(doc.data());
        });

      }

    });

  }, [])

  return (
    <div className="center">
      <CurrentUserContext.Provider value={currentUser}>
        <AppRouter />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
