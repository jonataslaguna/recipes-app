import { useState } from 'react';
import Header from '../../components/Header';
import { DrinkType, MealType } from '../RecipeDetails/detailsType';
import iconShare from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<MealType[] | DrinkType[]>([]);

  const savedStorageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')
    || '[]');
  if (savedStorageDoneRecipes !== null) {
    setDoneRecipes(savedStorageDoneRecipes);
  }

  return (
    <div>
      <Header pageTitle="Done Recipes" />
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      { doneRecipes.length > 0
      && doneRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src=""
            alt=""
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            Category
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            Name
          </p>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            Done in:
          </p>
          <button>
            <img
              src={ iconShare }
              alt=""
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <p
            data-testid={ `${index}-${recipe.strTags}-horizontal-tag` }
          >
            Tags
          </p>
        </div>
      ))}

    </div>
  );
}

export default DoneRecipes;
