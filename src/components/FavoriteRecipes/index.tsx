import { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { FavoriteRecipeType } from '../../utils/types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import ContextRecipes from '../../context/ContextRecipes';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipeType[]>([]);
  const [activeRecipes, setActiveRecipes] = useState<FavoriteRecipeType[]>([]); // [
  const [favorites, setFavorites] = useState([] as FavoriteRecipeType[]);
  const [clipBoard, setClipboard] = useState<string>('');
  const { handleRemoveFromFavorites } = useContext(ContextRecipes);
  const { host, protocol } = window.location;

  const filterFavorites = (type: string) => {
    if (type === 'all') {
      setActiveRecipes(favoriteRecipes);
    }
    const filtered = favoriteRecipes.filter((recipe: any) => recipe.type === type);
    setActiveRecipes(filtered);
  };

  useEffect(() => {
    const favoriteRecipesJSON = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesJSON !== null) {
      setFavoriteRecipes(JSON.parse(favoriteRecipesJSON));
      setActiveRecipes(JSON.parse(favoriteRecipesJSON));
    } else {
      console.log('Nenhuma receita favorita encontrada no localStorage.');
    }
  }, [favorites]);

  return (
    <div>
      <div
        className="favorite-filters"
      >
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setActiveRecipes(favoriteRecipes) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterFavorites('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterFavorites('drink') }
        >
          Drinks
        </button>
        {
        clipBoard && (
          <Alert
            variant="info"
            dismissible
            onClose={ () => setClipboard('') }
          >
            <Alert.Heading>Link copied!</Alert.Heading>
          </Alert>
        )
      }
      </div>
      { activeRecipes.length > 0 && (
        activeRecipes.map((
          { id, image, name, type, nationality, alcoholicOrNot, category },
          index,
        ) => (
          <div
            key={ index }
            style={ { padding: '50px' } }
          >
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
            />
            <div>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                { type === 'meal'
                  ? `${nationality} - ${category}`
                  : alcoholicOrNot }
              </span>
              <span
                data-testid={ `${index}-horizontal-name` }
              >
                { name }
              </span>
            </div>
            <div>
              <button
                onClick={ () => {
                  const url = `${protocol}//${host}/${type}s/${id}`;
                  navigator.clipboard.writeText(url);
                  setClipboard(url);
                } }
              >
                <img
                  src={ shareIcon }
                  alt="share icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                onClick={ () => {
                  handleRemoveFromFavorites(id);
                  setFavorites(favorites.filter((recipe: any) => recipe.id !== id));
                } }
              >
                <img
                  src={ blackHeartIcon }
                  alt="favorite icon"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoriteRecipes;
