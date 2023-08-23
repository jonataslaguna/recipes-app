export type FavoriteRecipeType = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
};

export type ItemMealType = {
  strMeal: string;
  strMealThumb: string;
};

export type ItemDrinkType = {
  strDrink: string;
  strDrinkThumb: string;
};

export type CategoryType = {
  strCategory: string;
};
