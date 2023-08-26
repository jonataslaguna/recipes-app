import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import useFetchDetails from '../../hooks/useFetchDetails';
import { DrinkType, MealType } from '../RecipeDetails/detailsType';
import './index.css';
import DetailsHeader from '../../components/DetailsHeader';

type RecipeInProgressProps = {
  type: string;
};
type RecipeDone = {
  id: string;
  type: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
  nationality: string;
};

function RecipeInProgress({ type }: RecipeInProgressProps) {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState<MealType>();
  const [drinkDetails, setDrinkDetails] = useState<DrinkType>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [measures, setMeasures] = useState<string[]>();
  const [checkedBoxes, setCheckedBoxes] = useState<{ [recipeId: string]:
  { [index: number]: boolean } }>({});
  const [clipboardText, setClipboardText] = useState<string>();

  const recipe: any = useFetchDetails(type, id);
  const nav = useNavigate();

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

  useEffect(() => {
    const localStorageCheckedBox = localStorage.getItem('inProgressRecipes');

    if (localStorageCheckedBox) {
      setCheckedBoxes(JSON.parse(localStorageCheckedBox));
    }
  }, []);

  const copyToClipboard = () => {
    const url = window.location.href.replace('/in-progress', '');
    setClipboardText(url);
    navigator.clipboard.writeText(url);
  };

  const handleCheckedBoxes = (recipeId: string, index: number) => {
    setCheckedBoxes((prevState) => ({
      ...prevState,
      [recipeId]: {
        ...prevState[recipeId],
        [index]: !prevState[recipeId]?.[index] || false,
      },
    }));
  };

  const handleDoneRecipes = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');

    const isoDate = new Date();

    const year = isoDate.getUTCFullYear();
    const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(isoDate.getUTCDate()).padStart(2, '0');
    const hours = String(isoDate.getUTCHours()).padStart(2, '0');
    const minutes = String(isoDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(isoDate.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(isoDate.getUTCMilliseconds()).padStart(3, '0');

    const recipeDone: RecipeDone = {
      id: id as string,
      type: type.toLowerCase(),
      category: mealDetails?.strCategory || drinkDetails?.strCategory || '',
      alcoholicOrNot: drinkDetails?.strAlcoholic || '',
      nationality: mealDetails?.strArea || '',
      name: mealDetails?.strMeal || drinkDetails?.strDrink || '',
      image: mealDetails?.strMealThumb || drinkDetails?.strDrinkThumb || '',
      doneDate: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`,
      tags: mealDetails?.strTags?.split(',') || [],
    };
    console.log(recipeDone);

    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, recipeDone]));

    nav('/done-recipes');
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

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedBoxes));
  }, [checkedBoxes]);

  const areAllIngredientsChecked = () => {
    const recipeCheckedBoxes = checkedBoxes[id as string];
    if (!recipeCheckedBoxes || ingredients === undefined) {
      return false;
    }
    return ingredients.every((_, index) => recipeCheckedBoxes[index]);
  };

  return (
    <div>
      <DetailsHeader
        id={ id as string }
        recipe={
          (recipe && type === 'Meal')
            ? {
              id: id as string,
              type: 'meal',
              nationality: recipe.strArea,
              category: recipe.strCategory,
              alcoholicOrNot: '',
              name: recipe.strMeal,
              image: recipe.strMealThumb }
            : {
              id: id as string,
              type: 'drink',
              nationality: '',
              category: recipe.strCategory,
              alcoholicOrNot: recipe.strAlcoholic,
              name: recipe.strDrink,
              image: recipe.strDrinkThumb }
        }
        onClick={ copyToClipboard }
      />
      {
        clipboardText && (
          <Alert
            variant="info"
            dismissible
            onClose={ () => setClipboardText('') }
          >
            <Alert.Heading>Link copied!</Alert.Heading>
          </Alert>
        )
      }
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
                  checked={ checkedBoxes[id as string]?.[index] || false }
                  onChange={ () => handleCheckedBoxes(id as string, index) }
                  id={ ingredient }
                />
                { checkedBoxes[index]
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
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ !areAllIngredientsChecked() }
        onClick={ handleDoneRecipes }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
