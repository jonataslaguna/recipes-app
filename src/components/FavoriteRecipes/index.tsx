import { useEffect, useState } from 'react';
import { FavoriteRecipeType } from '../../utils/types';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipeType[]>([]);

  useEffect(() => {
    const favoriteRecipesJSON = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesJSON !== null) {
      setFavoriteRecipes(JSON.parse(favoriteRecipesJSON));
    } else {
      console.log('Nenhuma receita favorita encontrada no localStorage.');
    }
  }, []);

  return (
    <div>
      <div
        className="favorite-filters"
      >
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      { favoriteRecipes.length > 0 && (
        favoriteRecipes.map((
          { image, name, type, nationality, alcoholicOrNot, category },
          index,
        ) => (
          <div
            key={ index }
          >
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
            />
            <div>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                { type === 'meal'
                  ? `${nationality} - ${category}`
                  : alcoholicOrNot }
              </span>
              <span
                data-testid={ `${index}-horizontal-name` }
              >
                { name }
              </span>
            </div>
            <div>
              <button
                type="button"
              >
                <img
                  src="../../images/shareIcon.svg"
                  alt="share icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
                Compartilhar Receita
              </button>
              <button
                type="button"
              >
                <img
                  src="../../images/blackHeartIcon.svg"
                  alt="favorite icon"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
                Favoritar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoriteRecipes;
