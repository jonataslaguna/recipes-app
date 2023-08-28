import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import iconShare from '../../images/shareIcon.svg';
import { DoneRecipesType } from '../../pages/DoneRecipes/DoneRecipesType';

import allBtn from '../../images/allBtn.svg';
import mealBtn from '../../images/mealIcon.svg';
import drinkBtn from '../../images/drinkIcon.svg';
import style from './doneRecipe.module.css';

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
    <div
      className={ style.doneRecipes }
    >
      <div
        className={ style.doneFilters }
      >
        <button
          className={ style.btn }
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilterClickAll }
        >
          <img
            className={ style.btnIcon }
            src={ allBtn }
            alt="Filter all button"
          />
          All
        </button>
        <button
          className={ style.btn }
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ handleFilterClickMeals }
        >
          <img
            className={ style.btnIcon }
            src={ mealBtn }
            alt="filter meals button"
          />
          Meals
        </button>
        <button
          className={ style.btn }
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilterClickDrinks }
        >
          <img
            className={ style.btnIcon }
            src={ drinkBtn }
            alt="filter drinks icon"
          />
          Drinks
        </button>
      </div>
      { filterDoneRecipes.length > 0
      && filterDoneRecipes.map((recipe, index) => (
        <div
          key={ recipe.id }
          className={ style.doneCard }
        >
          <div
            className={ style.doneImageCard }
          >
            <Link
              className={ style.doneLink }
              to={ recipe.type === 'meal'
                ? `/meals/${recipe.id}`
                : `/drinks/${recipe.id}` }
            >
              <img
                className={ style.doneImage }
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
          </div>
          <div
            className={ style.doneCardLeftSide }
          >
            <div
              className={ style.doneLefSideInfo }
            >
              <Link
                className={ style.doneLink }
                to={ recipe.type === 'meal'
                  ? `/meals/${recipe.id}`
                  : `/drinks/${recipe.id}` }
              >
                <p
                  className={ style.doneText }
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </p>
                <p
                  className={ style.doneCategory }
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                  {recipe?.alcoholicOrNot}
                </p>
                <span
                  className={ style.doneDoneIn }
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  Done in:
                  {' '}
                  {new Date(recipe.doneDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </Link>
              { clipboardText && (
                <Alert
                  variant="info"
                  dismissible
                  onClose={ () => setClipboardText('') }
                >
                  <Alert.Heading>Link copied!</Alert.Heading>
                </Alert>
              )}
              <div
                className={ style.doneTagsCard }
              >
                {recipe.tags.map((tag, indexTag) => (
                  <p
                    key={ indexTag }
                    className={ style.doneTags }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>
                ))}
              </div>
            </div>
            <div
              className={ style.doneLefSideShare }
            >
              <button
                className={ style.Btn }
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
                  className={ style.BtnIcon }
                  src={ iconShare }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipe;
