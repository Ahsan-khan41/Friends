import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from '../Pages/Signup/Signup'
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'


function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default AppRouter;