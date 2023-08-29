import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

type ButtonProps = {
  type: string;
  id: string;
};

function RecipesButton({ type, id }: ButtonProps) {
  const [isInProgress, setIsInProgress] = useState(false);
  const navigate = useNavigate();
  const [inProgress, setInProgress] = useLocalStorage('inProgressRecipes', {
    meals: {},
    drinks: {},
  });

  const verifyInProgress = () => {
    const recipes = localStorage.getItem('inProgressRecipes');
    if (recipes) {
      const inProgressRecipes = JSON.parse(recipes);
      const recipeType = type === 'Meal' ? 'meals' : 'drinks';
      setIsInProgress((Object.keys(inProgressRecipes[recipeType]).includes(id)));
    }
    return false;
  };

  const handleClick = () => {
    switch (type) {
      case 'Meal':
        setInProgress({
          ...inProgress,
          meals: {
            ...inProgress.meals,
            [id]: [],
          },
        });
        navigate(`/meals/${id}/in-progress`);
        break;
      case 'Drink':
        setInProgress({
          ...inProgress,
          drinks: {
            ...inProgress.drinks,
            [id]: [],
          },
        });
        navigate(`/drinks/${id}/in-progress`);
        break;
      default: return null;
    }
  };

  useEffect(() => {
    verifyInProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProgress]);

  return (
    <div>
      <Button
        variant={ isInProgress ? 'warning' : 'danger' }
        style={ { position: 'fixed',
          bottom: '0',
          zIndex: 5,
          width: '336px',
        } }
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        {
          isInProgress
            ? 'Continue Recipe'
            : 'Start Recipe'
        }
      </Button>
    </div>
  );
}

export default RecipesButton;
