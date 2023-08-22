export const getIngredient = async (ingredient: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data;
};

export const getName = async (name: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

export const getFirstLetter = async (FirstLetter: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstLetter}`);
  const data = await response.json();
  return data;
};
