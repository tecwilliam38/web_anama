import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';

function App() {
  return (
    <Router>                
        <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
        </Routes>
    </Router>
)
}

export default App;

