import { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FavoriteRecipeType } from '../../utils/types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import ContextRecipes from '../../context/ContextRecipes';

import allBtn from '../../images/allBtn.svg';
import mealBtn from '../../images/mealIcon.svg';
import drinkBtn from '../../images/drinkIcon.svg';
import style from './FavoriteRecipes.module.css';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipeType[]>([]);
  const [activeRecipes, setActiveRecipes] = useState<FavoriteRecipeType[]>([]);
  const [favorites, setFavorites] = useState([] as FavoriteRecipeType[]);
  const [clipBoard, setClipboard] = useState<string>('');
  const { handleRemoveFromFavorites } = useContext(ContextRecipes);
  const { host, protocol } = window.location;

  const filterFavorites = (type: string) => {
    const filtered = favoriteRecipes.filter((recipe: any) => recipe.type === type);
    setActiveRecipes(filtered);
  };

  useEffect(() => {
    const favoriteRecipesJSON = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesJSON !== null) {
      setFavoriteRecipes(JSON.parse(favoriteRecipesJSON));
      setActiveRecipes(JSON.parse(favoriteRecipesJSON));
    } else {
      console.log('Nenhuma receita favorita encontrada no localStorage.');
    }
  }, [favorites]);

  return (
    <div
      className={ style.favoriteRecipes }
    >
      <div
        className={ style.favoriteFilters }
      >
        <button
          className={ style.btn }
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setActiveRecipes(favoriteRecipes) }
        >
          <img
            className={ style.btnIcon }
            src={ allBtn }
            alt="Filter all button"
          />
          All
        </button>
        <button
          className={ style.btn }
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterFavorites('meal') }
        >
          <img
            className={ style.btnIcon }
            src={ mealBtn }
            alt="filter meals button"
          />
          Meals
        </button>
        <button
          className={ style.btn }
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterFavorites('drink') }
        >
          <img
            className={ style.btnIcon }
            src={ drinkBtn }
            alt="filter drinks icon"
          />
          Drinks
        </button>
        {
        clipBoard && (
          <Alert
            variant="info"
            dismissible
            onClose={ () => setClipboard('') }
          >
            <Alert.Heading>Link copied!</Alert.Heading>
          </Alert>
        )
      }
      </div>
      { activeRecipes.length > 0 && (
        activeRecipes.map((
          { id, image, name, type, nationality, alcoholicOrNot, category },
          index,
        ) => (
          <div
            key={ index }
            className={ style.favoriteCard }
          >
            <div
              className={ style.favoriteImageCard }
            >
              <Link
                className={ style.favoriteLink }
                to={ `/${type}s/${id}` }
              >
                <img
                  className={ style.favoriteImage }
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
            </div>
            <div
              className={ style.favoriteCardLeftSide }
            >
              <Link
                className={ style.favoriteLink }
                to={ `/${type}s/${id}` }
              >
                <div
                  className={ style.favoriteTextCard }
                >
                  <h4
                    className={ style.favoriteText }
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { name }
                  </h4>
                  <h4
                    className={ style.favoriteCategory }
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { type === 'meal'
                      ? `${nationality} - ${category}`
                      : alcoholicOrNot }
                  </h4>
                </div>
              </Link>
              <div
                className={ style.favoriteBtns }
              >
                <button
                  className={ style.Btn }
                  onClick={ () => {
                    const url = `${protocol}//${host}/${type}s/${id}`;
                    navigator.clipboard.writeText(url);
                    setClipboard(url);
                  } }
                >
                  <img
                    className={ style.BtnIcon }
                    src={ shareIcon }
                    alt="share icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <button
                  className={ style.Btn }
                  onClick={ () => {
                    handleRemoveFromFavorites(id);
                    setFavorites(favorites.filter((recipe: any) => recipe.id !== id));
                  } }
                >
                  <img
                    className={ style.BtnIcon }
                    src={ blackHeartIcon }
                    alt="favorite icon"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoriteRecipes;
