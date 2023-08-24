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
  idMeal?: string;
  strMeal: string;
  strMealThumb: string;
};

export type ItemDrinkType = {
  idDrink?: string;
  strDrink: string;
  strDrinkThumb: string;
};

export type CategoryType = {
  strCategory: string;
};

export type CategoryDataMealsType = {
  meals: ItemMealType[];
};

export type CategoryDataDrinksType = {
  drinks: ItemDrinkType[];
};
