import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from '../Pages/Signup/Signup'
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Posts from "../components/Posts/Posts";
import { Friends } from "../components/Friends/Friends";
import Profile from "../components/Profile/Profile";


function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} >
                        <Route path="posts" element={<Posts/>} />
                        <Route path="friends" element={<Friends/>} />
                        <Route path="profile" element={<Profile/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default AppRouter;