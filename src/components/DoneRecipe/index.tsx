import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import iconShare from '../../images/shareIcon.svg';
import { DoneRecipesType } from '../../pages/DoneRecipes/DoneRecipesType';

function DoneRecipe() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>([]);
  const [clipboardText, setClipboardText] = useState<string>();
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
