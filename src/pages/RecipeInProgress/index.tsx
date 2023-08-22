import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fecthMealDetails, fetchDrinkDetails } from '../RecipeDetails/useFetchDetails';
import { DrinkType, MealType } from '../RecipeDetails/detailsType';

type RecipeInProgressProps = {
  type: string;
};

function RecipeInProgress({ type }: RecipeInProgressProps) {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState<MealType>();
  const [drinkDetails, setDrinkDetails] = useState<DrinkType>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [measures, setMeasures] = useState<string[]>();

  const renderInfo = (recipesData: MealType | DrinkType) => {
    if (recipesData) {
      const measuresData = Object.entries(recipesData as MealType)
        .filter((entry) => entry[0]
          .includes('strMeasure') && entry[1] !== null && entry[1] !== '')
        .map((entry) => entry[1]);
      setMeasures(measuresData);

      const ingredientsData = Object.entries(recipesData as MealType)
        .filter((entry) => entry[0]
          .includes('strIngredient') && entry[1] !== null && entry[1] !== '')
        .map((entry) => entry[1]);
      setIngredients(ingredientsData);
    }
  };

  useEffect(() => {
    if (type === 'Meal') {
      fecthMealDetails(id).then((data) => {
        setMealDetails(data);
        renderInfo(data);
      });
    } else {
      fetchDrinkDetails(id).then((data) => {
        setDrinkDetails(data);
        renderInfo(data);
      });
    }
  }, []);

  return (
    <div>
      <h1>Receita em Progresso</h1>
      <div>
        <h2
          data-testid="recipe-category"
        >
          { type === 'Meal'
            ? mealDetails?.strCategory
            : drinkDetails?.strCategory }
        </h2>
        <h5
          data-testid="recipe-category"
        >
          { drinkDetails && drinkDetails.strAlcoholic }
        </h5>
        <button data-testid="share-btn">
          Compartilhar
        </button>
        <button data-testid="favorite-btn">
          Favoritar
        </button>
        <img
          data-testid="recipe-photo"
          src={ type === 'Meal'
            ? mealDetails?.strMealThumb
            : drinkDetails?.strDrinkThumb }
          alt="Recipe"
        />
        <h2 data-testid="recipe-title">
          { type === 'Meal'
            ? mealDetails?.strMeal
            : drinkDetails?.strDrink }
        </h2>
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {
            ingredients?.map((ingredient, index) => (
              <li
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${ingredient} - ${measures?.[index]}` }
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">
          { type === 'Meal'
            ? mealDetails?.strInstructions
            : drinkDetails?.strInstructions }
        </p>
      </div>
      <button data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
