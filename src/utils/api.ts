export const getIngredient = async (ingredient: string, page: string) => {
  if (page === 'Meals') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data;
};

export const getName = async (name: string, page: string) => {
  if (page === 'Meals') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

export const getFirstLetter = async (firstLetter: string, page: string) => {
  if (page === 'Meals') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const data = await response.json();
    return data;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data;
};

export const getCategoryMeal = async (categoryMeal: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryMeal}`);
  const data = await response.json();
  return data;
};

export const getCategoryDrink = async (categoryDrink: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryDrink}`);
  const data = await response.json();
  return data;
};
