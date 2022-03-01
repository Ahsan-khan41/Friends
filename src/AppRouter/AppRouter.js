import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Posts from "../components/Posts/Posts";
import { Friends } from "../components/Friends/Friends";
import Profile from "../components/Profile/Profile";
import User from "../Pages/UserPage/User";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function AppRouter() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
      console.log("user logged out!");
    }
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="posts" element={<Posts />} />
            <Route path="friends" element={<Friends />} />
            <Route path="profile" element={<Profile />} />
            <Route path="user" element={<User />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
