import { useState } from 'react';
import { FavoriteRecipeType } from '../../utils/types';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipeType[]>([]);

  const favoriteRecipesJSON = localStorage.getItem('favoriteRecipes');

  if (favoriteRecipesJSON !== null) {
    setFavoriteRecipes(JSON.parse(favoriteRecipesJSON));
    console.log(favoriteRecipes);
  } else {
    console.log('Nenhuma receita favorita encontrada no localStorage.');
  }

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
        favoriteRecipes.map((recipe, index) => (
          <div
            key={ index }
          >
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <div>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.category }
              </span>
              <span
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }
              </span>
            </div>
            <div>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
              >
                Compartilhar Receita
              </button>
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
              >
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
