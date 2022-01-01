import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { fireDB } from './firebaseConfig';
import CurrentUserContext from './ContextAPI/CurrentUserContext';
import { Route, Routes } from 'react-router-dom';
import Posts from './components/Posts/Posts';
import { Friends } from './components/Friends/Friends';
import Profile from './components/Profile/Profile';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';


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
        console.log("app.js");
      }
      else {
        setFirebaseAuth(false);
      }

    });

  }, [])

  return (
    <div className="center">
      {!firebaseAuth && (
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}

      <CurrentUserContext.Provider value={currentUser}>
        {firebaseAuth && (
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} >
              <Route path="posts" element={<Posts />} />
              <Route path="friends" element={<Friends />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        )}
      </CurrentUserContext.Provider>

      {/* <Routes>
        <Route path="*" element={<Navigate to={firebaseAuth ? "/dashboard" : "/login"} />} />
      </Routes> */}
    </div>
  );
}

export default App;