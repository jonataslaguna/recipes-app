import { useEffect, useState } from 'react';
import { DrinkType, MealType } from './detailsType';

export default function useFetchDetails(type: string, id: any) {
  const [recipe, setRecipe] = useState({} as MealType | DrinkType);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = type === 'Meal'
        ? await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        : await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const details = type === 'Meal' ? data.meals[0] : data.drinks[0];
      setRecipe(details);
    };
    fetchDetails();
  }, [id, type]);

  return recipe;
}
