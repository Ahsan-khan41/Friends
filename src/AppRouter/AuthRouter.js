import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from '../Pages/Signup/Signup'
import Login from '../Pages/Login/Login'


function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default AppRouter;