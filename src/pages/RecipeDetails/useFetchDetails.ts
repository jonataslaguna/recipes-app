// import { useEffect, useState } from 'react';
import { DrinkType, MealType } from './detailsType';

// export default function useFetchDetails(type: string, id: any) {
//   const [recipe, setRecipe] = useState({});

export const fecthMealDetails = async (id: any): Promise<MealType> => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals[0];
};

export const fetchDrinkDetails = async (id: any): Promise<DrinkType> => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks[0];
};

//   useEffect(() => {
//     const fetchDetails = async () => {
//       const details = type === 'Meal'
//         ? await fecthMealDetails()
//         : await fetchDrinkDetails();
//       setRecipe(details);
//     };
//     fetchDetails();
//   }, []);

//   return recipe;
// }
