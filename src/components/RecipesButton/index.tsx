import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

type ButtonProps = {
  type: string;
  id: string;
};

function RecipesButton({ type, id }: ButtonProps) {
  const [isInProgress, setIsInProgress] = useState(false);
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
        break;
      case 'Drink':
        setInProgress({
          ...inProgress,
          drinks: {
            ...inProgress.drinks,
            [id]: [],
          },
        });
        break;
      default: return null;
    }
  };

  useEffect(() => {
    verifyInProgress();
  }, [inProgress]);

  return (
    <div>
      <Button
        style={ { position: 'fixed', bottom: '0', zIndex: 5 } }
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
