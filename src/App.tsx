import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import MealsPage from './pages/meals';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <MealsPage /> } />
      </Routes>
      { /*
      Deixei comentado caso precise depois

      <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div>  */ }
    </>
  );
}

export default App;
