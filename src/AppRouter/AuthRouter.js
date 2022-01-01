import { Routes, Route } from "react-router-dom";
import Signup from '../Pages/Signup/Signup'
import Login from '../Pages/Login/Login'


function AuthRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default AuthRouter;