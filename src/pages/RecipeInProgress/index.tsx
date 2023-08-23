import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetchDetails from '../RecipeDetails/useFetchDetails';
import { DrinkType, MealType } from '../RecipeDetails/detailsType';
import './index.css';

type RecipeInProgressProps = {
  type: string;
};

function RecipeInProgress({ type }: RecipeInProgressProps) {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState<MealType>();
  const [drinkDetails, setDrinkDetails] = useState<DrinkType>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [measures, setMeasures] = useState<string[]>();
  const [checkedBox, setCheckedBox] = useState<{ [index: number]: boolean }>({});

  const recipe: MealType | DrinkType = useFetchDetails(type, id);

  const renderInfo = (recipesData: MealType | DrinkType) => {
    if (recipesData) {
      const measuresData = Object.entries(recipesData)
        .filter((entry) => entry[0]
          .includes('strMeasure') && entry[1] !== null && entry[1] !== '')
        .map((entry) => entry[1]);
      setMeasures(measuresData);

      const ingredientsData = Object.entries(recipesData)
        .filter((entry) => entry[0]
          .includes('strIngredient') && entry[1] !== null && entry[1] !== '')
        .map((entry) => entry[1]);
      setIngredients(ingredientsData);
    }
  };

  const handleCheckedBoxes = (index: number) => {
    setCheckedBox((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    if (type === 'Meal') {
      setMealDetails(recipe as MealType);
      renderInfo(recipe);
    } else {
      setDrinkDetails(recipe as DrinkType);
      renderInfo(recipe);
    }
  }, [recipe, type]);

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
              <label
                className="checkbox"
                key={ ingredient }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  name="ingredient"
                  checked={ checkedBox[index] }
                  onChange={ () => handleCheckedBoxes(index) }
                  id={ ingredient }
                />
                { checkedBox[index]
                  ? <del>{ `${ingredient} - ${measures?.[index]}` }</del>
                  : `${ingredient} - ${measures?.[index]}` }
              </label>
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
