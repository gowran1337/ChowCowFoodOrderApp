import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <div class="app">
      <Router>
        <Routes>

          <Route path="/" element={<WelcomePage/>}/>
          <Route path="/home" element={<IndexPage />}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/payment" element={<PaymentPage/>}/>
          <Route path="/welcome" element={<WelcomePage/>}/>

        </Routes>    
      </Router>
    
    </div>
  );
}

export default App;
