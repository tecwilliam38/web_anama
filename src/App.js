import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import { AuthProvider, useAuth } from "./context/auth";
// import {PrivateRoute} from "./context/privateRoute";
import { SessionContextProvider, useUser } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { PrivateRoute } from "./context/privateRoute";

const SUPABASEURL = "https://kpcanhcozznqvfibklhd.supabase.co";
const SUPABASEAPIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwY2FuaGNvenpucXZmaWJrbGhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MjQ5OTQsImV4cCI6MjA1MTQwMDk5NH0.684EaApGs1HDiRVK3G04SFSvZxbqGaN2orbdWq31D7E";

export const supabase = createClient(SUPABASEURL, SUPABASEAPIKEY);

function App({ children }) {
    const usuarioLogado = useUser();
    const { isAuthenticated } = useAuth();
    // const [isLoggedIn, setIsloggedIn] = useState(null);
    useEffect(() => {
        // const response = localStorage.getItem("loggedIn");
        // setIsloggedIn(response);
        // console.log(isLoggedIn);
        PrivateRoute();
        return;
    }, [usuarioLogado])


    const userToken = localStorage.getItem('isLoggedIn'); // ou sessionStorage
    console.log(userToken);



    return (
        <>
            <AuthProvider>
                <SessionContextProvider supabaseClient={supabase}>
                    <Router>
                        <Routes>
                            <Route path="/" element={userToken === "true" ?
                                <HomeScreen />
                                :
                                <LoginScreen />
                            } />                            
                            <Route path="/login" element={<LoginScreen />} />
                            {/* <Route path="/" element={userToken === "true" ? <HomeScreen /> : <LoginScreen />} /> */}
                            <Route path="/home" element={<HomeScreen />} />
                        </Routes>
                    </Router>
                </SessionContextProvider>
            </AuthProvider>
        </>
    )
}

export default App;

