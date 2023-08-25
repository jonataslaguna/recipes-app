import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import iconShare from '../../images/shareIcon.svg';
import { DoneRecipesType } from '../../pages/DoneRecipes/DoneRecipesType';
import styles from './doneRecipe.module.css';

function DoneRecipe() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>([]);
  const [clipboardText, setClipboardText] = useState<string>();
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const savedStorageDoneRecipes = localStorage.getItem('doneRecipes');
    if (savedStorageDoneRecipes !== null) {
      setDoneRecipes(JSON.parse(savedStorageDoneRecipes));
    }
  }, []);

  const handleFilterClickMeals = () => {
    setFilter('meal');
  };

  const handleFilterClickDrinks = () => {
    setFilter('drink');
  };

  const handleFilterClickAll = () => {
    setFilter('all');
  };

  const filterDoneRecipes = filter === 'all'
    ? doneRecipes
    : doneRecipes.filter((recipe) => recipe.type === filter);

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilterClickAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleFilterClickMeals }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilterClickDrinks }
      >
        Drinks
      </button>

      { filterDoneRecipes.length > 0
      && filterDoneRecipes.map((recipe, index) => (
        <div
          key={ recipe.id }
          className={ styles.recipeCard }
        >
          <Link
            to={ recipe.type === 'meal'
              ? `/meals/${recipe.id}`
              : `/drinks/${recipe.id}` }
          >
            <img
              className="img-thumbnail"
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />

          </Link>

          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe.category}`}
            {recipe?.alcoholicOrNot}
          </p>

          <Link
            to={ recipe.type === 'meal'
              ? `/meals/${recipe.id}`
              : `/drinks/${recipe.id}` }
          >
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </p>
          </Link>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            Done in:
            {recipe.doneDate}
          </p>

          <button
            type="button"
            onClick={ () => {
              const url = window.location.href
                .replace('/done-recipes', `/meals/${recipe.id}`
                || `/drinks/${recipe.id}`);
              setClipboardText(url);
              navigator.clipboard.writeText(url);
            } }
          >
            <img
              src={ iconShare }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          { clipboardText && (
            <Alert
              variant="info"
              dismissible
              onClose={ () => setClipboardText('') }
            >
              <Alert.Heading>Link copied!</Alert.Heading>
            </Alert>
          )}
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
