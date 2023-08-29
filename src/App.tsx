import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import FavoritesRecipes from './pages/FavoritesRecipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/meals/:id" element={ <RecipeDetails type="Meal" /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails type="Drink" /> } />
        <Route path="/meals/:id/:in" element={ <RecipeInProgress type="Meal" /> } />
        <Route path="/drinks/:id/:in" element={ <RecipeInProgress type="Drink" /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoritesRecipes /> } />
        <Route path="*" element={ <h1>Not Found</h1> } />
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
