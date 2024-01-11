import React from 'react';
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm.js';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/registerform" element={<RegisterForm />} />
            {/* Configure mais rotas conforme necessário */}
        </Routes>
    </Router>
  );
}

export default App;
