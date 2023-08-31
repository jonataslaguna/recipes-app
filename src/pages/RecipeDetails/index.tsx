import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { DrinkType, MealType } from './detailsType';
import useFetchDetails from '../../hooks/useFetchDetails';
import Recommendations from '../../components/Recommendations';
import RecipesButton from '../../components/RecipesButton';
import DetailsHeader from '../../components/DetailsHeader';
import style from './recipeDetails.module.css';
// import useFetchDetails, { fecthMealDetails, fetchDrinkDetails } from './useFetchDetails';

type RecipeDetailsProps = {
  type: string;
};

function RecipeDetails({ type }: RecipeDetailsProps) {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState<MealType>();
  const [drinkDetails, setDrinkDetails] = useState<DrinkType>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [measures, setMeasures] = useState<string[]>();
  const [recommendations, setRecommendations] = useState<MealType[] | DrinkType[]>();
  const [clipboardText, setClipboardText] = useState<string>();
  // const [isLoading, setIsLoading] = useState(false);

  const recipe: any = useFetchDetails(type, id);

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

  const fetchRecomedations = async () => {
    const response = type === 'Meal'
      ? await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      : await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const recomendationsData = type === 'Meal'
      ? data.drinks
      : data.meals;
    setRecommendations(recomendationsData);
    console.log(recomendationsData);
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    setClipboardText(url);
    navigator.clipboard.writeText(url);
  };

  useEffect(() => {
    if (type === 'Meal') {
      setMealDetails(recipe as MealType);
      renderInfo(recipe);
    } else {
      setDrinkDetails(recipe as DrinkType);
      renderInfo(recipe);
    }
    fetchRecomedations();
  }, [recipe]);

  return (
    <div className={ style.recipeDetailsBottom }>
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
      <div className={ style.categoryContainer }>
        <h2
          className={ style.categoryName }
          data-testid="recipe-category"
        >
          { type === 'Meal'
            ? mealDetails?.strCategory
            : drinkDetails?.strCategory }
        </h2>
        <h5
          className={ style.categoryAlcoholic }
          data-testid="recipe-category"
        >
          { drinkDetails && drinkDetails.strAlcoholic }
        </h5>
        <img
          className={ style.recipeImg }
          data-testid="recipe-photo"
          src={ type === 'Meal'
            ? mealDetails?.strMealThumb
            : drinkDetails?.strDrinkThumb }
          alt="Recipe"
        />
        <h2
          className={ style.recipeName }
          data-testid="recipe-title"
        >
          { type === 'Meal'
            ? mealDetails?.strMeal
            : drinkDetails?.strDrink }
        </h2>
      </div>
      <div className={ style.marginContainer }>
        <div className={ style.ingredientsContainer }>
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
        <div className={ style.instructionsContainer }>
          <h3>Instructions</h3>
          <div className={ style.instructionsTextContainer }>
            <p data-testid="instructions">
              { type === 'Meal'
                ? mealDetails?.strInstructions
                : drinkDetails?.strInstructions }
            </p>
          </div>
        </div>
        <div className={ style.videoContainer }>
          <h3>Video</h3>
          <iframe
            data-testid="video"
            title="video"
            src={ type === 'Meal' ? mealDetails?.strYoutube : undefined }
            width="420"
            height="345"
          />
        </div>
        <div
          className={ style.recommendations }
          style={ { zIndex: 1 } }
        >
          <h5>
            Recommendations
          </h5>
          <div
            className={ style.recommendationsImg }
          >
            <Recommendations
              recommendations={ recommendations as any }
              type={ type }
            />
          </div>
        </div>
      </div>
      <RecipesButton
        id={ id as string }
        type={ type }
      />
    </div>
  );
}

export default RecipeDetails;
