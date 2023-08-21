import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';

import Header from './components/Header';
import MealsPage from './pages/meals';
import Drinks from './pages/meals/Drinks';
import Profile from './pages/meals/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />

        <Route
          path="/meals"
          element={
            <>
              <Header pageTitle="Meals" showSearchIcon />
              <MealsPage />
            </>
          }
        />
        <Route
          path="/drinks"
          element={
            <>
              <Header pageTitle="Drinks" showSearchIcon />
              <Drinks />
            </>
            }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header pageTitle="Profile" />
              <Profile />
            </>
            }
        />
        <Route path="/meals/:id" />
        <Route path="/drinks/:id" />
        <Route path="/meals/:id/:in" />
        <Route path="/drinks/:id/:in" />
        <Route
          path="/done-recipes"
          element={ <Header pageTitle="Done Recipes" /> }
        />
        <Route
          path="/favorite-recipes"
          element={ <Header pageTitle="Favorite Recipes" /> }
        />
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
