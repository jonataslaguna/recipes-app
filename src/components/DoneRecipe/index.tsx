import { useEffect, useState } from 'react';
import iconShare from '../../images/shareIcon.svg';
import { DoneRecipesType } from '../../pages/DoneRecipes/DoneRecipesType';

function DoneRecipe() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>([]);
  useEffect(() => {
    const savedStorageDoneRecipes = localStorage.getItem('doneRecipes');
    if (savedStorageDoneRecipes !== null) {
      setDoneRecipes(JSON.parse(savedStorageDoneRecipes));
    }
  }, []);

  return (
    <div>
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

      { doneRecipes.length > 0
      && doneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            alt=""
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe.category}`}
            {recipe?.alcoholicOrNot}
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}

          </p>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            Done in:
            {recipe.doneDate}
          </p>
          <button
            type="button"
          >
            <img
              src={ iconShare }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {recipe.tags.map((tag, indexTag) => (
            <p
              key={ indexTag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {recipe.tags}
            </p>
          ))}
        </div>
      ))}

    </div>
  );
}

export default DoneRecipe;
