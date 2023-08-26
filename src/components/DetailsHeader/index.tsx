import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import ContextRecipes from '../../context/ContextRecipes';
import { FavoriteRecipeType } from '../../utils/types';

type DetailsHeaderProps = {
  onClick: () => void;
  recipe: FavoriteRecipeType;
  id: string;
};

function DetailsHeader(props: DetailsHeaderProps) {
  const { onClick, recipe, id } = props;
  const [favorite, isFavorite] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { handleAddToFavorites, handleRemoveFromFavorites } = useContext(ContextRecipes);

  useEffect(() => {
    const favoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const favoriteRecipe = favoritesStorage
      .some((fav: FavoriteRecipeType) => fav.id === id);
    isFavorite(favoriteRecipe);
  }, [id]);

  return (
    <div>
      <div
        style={ { display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        } }
      >
        <button
          onClick={ () => (location.pathname.includes('meals')
            ? navigate('/meals')
            : navigate('/drinks')) }
        >
          { '< '}
        </button>
        <div
          style={ { display: 'flex', justifyContent: 'end' } }
        >
          <button
            data-testid="share-btn"
            onClick={ onClick }
          >
            <img src={ shareIcon } alt="favorite" />
          </button>
          <button
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
