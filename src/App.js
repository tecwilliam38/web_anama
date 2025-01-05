import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import { AuthProvider } from "./context/auth";
import PrivateRoute from "./context/privateRoute";

function App({ children }) {
    return (
        <>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginScreen />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/home" element={<PrivateRoute><HomeScreen /></PrivateRoute>} />
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    )
}

export default App;

