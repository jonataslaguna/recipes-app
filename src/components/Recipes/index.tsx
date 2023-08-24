import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CategoryType, ItemDrinkType, ItemMealType } from '../../utils/types';
import { getCategoryDrink, getCategoryMeal } from '../../utils/api';

function Recipes() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const path = location.pathname.replace('/', '');

  useEffect(() => {
    const fetchParam = async () => {
      const fetchMeals = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const dataResponse = await response.json();
        setData(dataResponse.meals);
        const fetchCategories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const dataCategories = await fetchCategories.json();
        setCategories(dataCategories.meals);
      };
      const fetchDrinks = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const dataResponse = await response.json();
        setData(dataResponse.drinks);
        const fetchCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const dataCategories = await fetchCategories.json();
        setCategories(dataCategories.drinks);
      };
      return path === 'meals' ? fetchMeals() : fetchDrinks();
    };
    fetchParam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async (categoryName: string) => {
    if (path === 'meals') {
      const fetchMealCategory = await getCategoryMeal(categoryName);
      if (fetchMealCategory.meals.length > 11) {
        setCategoryData(fetchMealCategory.meals.slice(0, 12));
      } else {
        setCategoryData(fetchMealCategory.meals);
      }
      console.log(categoryData);
    } else {
      const fetchDrinkCategory = await getCategoryDrink(categoryName);
      if (fetchDrinkCategory.drinks.length > 11) {
        setCategoryData(fetchDrinkCategory.drinks.slice(0, 12));
      } else {
        setCategoryData(fetchDrinkCategory.drinks);
      }
      console.log(categoryData);
    }
  };

  const dataWith12Length = data.slice(0, 12);
  const categoriesWith5Length = categories.slice(0, 5);
  return (
    <div>
      { categoriesWith5Length.map(({ strCategory: categoryName }: CategoryType) => (
        <button
          key={ categoryName }
          data-testid={ `${categoryName}-category-filter` }
          onClick={ () => handleClick(categoryName) }
        >
          { categoryName }
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ () => setCategoryData([]) }
      >
        All
      </button>
      { categoryData.length > 0 && path === 'meals' && (
        categoryData.map(({ strMeal, strMealThumb }: ItemMealType, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <h2
              data-testid={ `${index}-card-name` }
            >
              { strMeal }

            </h2>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt="Meal Thumb"
            />
          </div>
        )))}
      { categoryData.length > 0 && path === 'drinks' && (
        categoryData.map(({ strDrink, strDrinkThumb }: ItemDrinkType, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <h2
              data-testid={ `${index}-card-name` }
            >
              { strDrink }

            </h2>
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt="Drink Thumb"
            />
          </div>
        )))}
      { categoryData.length === 0 && path === 'meals' && (
        dataWith12Length.map(({ strMeal, strMealThumb }: ItemMealType, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <h2
              data-testid={ `${index}-card-name` }
            >
              { strMeal }
            </h2>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt="Meal Thumb"
            />
          </div>
        ))
      ) }

      { categoryData.length === 0 && path === 'drinks' && (
        dataWith12Length.map(({ strDrink, strDrinkThumb }: ItemDrinkType, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <h2
              data-testid={ `${index}-card-name` }
            >
              { strDrink }
            </h2>
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt="Drink Thumb"
            />
          </div>
        )))}
    </div>
  );
}

export default Recipes;
