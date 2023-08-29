import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import whiteHeartIcon from '../../images/whiteHeartBtn.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import ContextRecipes from '../../context/ContextRecipes';
import { FavoriteRecipeType } from '../../utils/types';
import style from './DetailsHeader.module.css';
import beefCategoryIcon from '../../images/beefCategory.svg';
import breakfastCategoryIcon from '../../images/breakfastCategory.svg';
import chickenCategoryIcon from '../../images/chickenCategory.svg';
import dessertCategoryIcon from '../../images/dessertCategory.svg';
import goatCategoryIcon from '../../images/goatCategory.svg';
import ordinaryDrinkCategoryIcon from '../../images/ordinaryDrinkCategory.svg';
import cocktailCategoryIcon from '../../images/cocktailCategory.svg';
import shakeCategoryIcon from '../../images/shakeCategory.svg';
import otheUnknownCategoryIcon from '../../images/otherCategory.svg';
import cocoaCategoryIcon from '../../images/cocoaDownload.png';
import allIcon from '../../images/allCategoryBtn.svg';

type DetailsHeaderProps = {
  onClick: () => void;
  recipe: FavoriteRecipeType;
  id: string;
};

function DetailsHeader(props: DetailsHeaderProps) {
  const { onClick, recipe, id } = props;
  const [favorite, isFavorite] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [pageIcons, setPageIcons] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { handleAddToFavorites, handleRemoveFromFavorites } = useContext(ContextRecipes);

  useEffect(() => {
    const favoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const favoriteRecipe = favoritesStorage
      .some((fav: FavoriteRecipeType) => fav.id === id);
    isFavorite(favoriteRecipe);
  }, [id]);

  const { category } = recipe;
  useEffect(() => {
    setCategoryName(category);
    const pageName = () => {
      switch (categoryName) {
        case 'Beef':
          setPageIcons(beefCategoryIcon);
          break;
        case 'Breakfast':
          setPageIcons(breakfastCategoryIcon);
          break;
        case 'Chicken':
          setPageIcons(chickenCategoryIcon);
          break;
        case 'Dessert':
          setPageIcons(dessertCategoryIcon);
          break;
        case 'Goat':
          setPageIcons(goatCategoryIcon);
          break;
        case 'Ordinary Drink':
          setPageIcons(ordinaryDrinkCategoryIcon);
          break;
        case 'Cocktail':
          setPageIcons(cocktailCategoryIcon);
          break;
        case 'Shake':
          setPageIcons(shakeCategoryIcon);
          break;
        case 'Other / Unknown':
          setPageIcons(otheUnknownCategoryIcon);
          break;
        case 'Cocoa':
          setPageIcons(cocoaCategoryIcon);
          break;
        default:
          setPageIcons(allIcon);
          break;
      }
    };
    pageName();
  }, [categoryName, setCategoryName, category]);
  return (
    <div className={ style.header }>
      <div className={ style.btnContainer }>
        <button
          className={ `${style.btn} ${style.categoryBtn}` }
          onClick={ () => (location.pathname.includes('meals')
            ? navigate('/meals')
            : navigate('/drinks')) }
        >
          { categoryName
          && (<img
            className={ style.categoryBtnImg }
            src={ pageIcons }
            alt="Icon Category"
          />) }
        </button>
        <div className={ style.btnContainerRight }>
          <button
            className={ style.btn }
            data-testid="share-btn"
            onClick={ onClick }
          >
            <img src={ shareIcon } alt="favorite" />
          </button>
          <button
            className={ style.btn }
            onClick={ () => {
              if (favorite) {
                handleRemoveFromFavorites(id);
                isFavorite(false);
              } else {
                handleAddToFavorites(recipe);
                isFavorite(true);
              }
            } }
          >
            <img
              className={ style.btnFavorite }
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              data-testid="favorite-btn"
              alt="favorite"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsHeader;
