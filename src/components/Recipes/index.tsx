import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CategoryType, ItemDrinkType, ItemMealType } from '../../utils/types';
import { getCategoryDrink, getCategoryMeal } from '../../utils/api';
import style from './Recipes.module.css';

function Recipes() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
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
    if (categoryName === selectedCategory) {
      setSelectedCategory('');
      setCategoryData([]);
      return;
    }
    if (path === 'meals') {
      setSelectedCategory(categoryName);
      const fetchMealCategory = await getCategoryMeal(categoryName);
      if (fetchMealCategory.meals.length > 11) {
        setCategoryData(fetchMealCategory.meals.slice(0, 12));
      } else {
        setCategoryData(fetchMealCategory.meals);
      }
    } else {
      setSelectedCategory(categoryName);
      const fetchDrinkCategory = await getCategoryDrink(categoryName);
      if (fetchDrinkCategory.drinks.length > 11) {
        setCategoryData(fetchDrinkCategory.drinks.slice(0, 12));
      } else {
        setCategoryData(fetchDrinkCategory.drinks);
      }
    }
  };

  const dataWith12Length = data?.slice(0, 12);
  const categoriesWith5Length = categories?.slice(0, 5);

  return (
    <div>
      <div
        className={ style.categoryBtnsContainer }
      >
        { categoriesWith5Length?.map(({ strCategory: categoryName }: CategoryType) => (
          <button
            // line commented because breaks the tests
            className={
              categoryName === 'Ordinary Drink' || categoryName === 'Other / Unknown'
                ? `${style.categoryBtns} ${style[`btn${categoryName.replace(/[\s/]/g, '')}`]}`
                : `${style.categoryBtns} ${style[`btn${categoryName}`]}`
              }
            key={ categoryName }
            data-testid={ `${categoryName}-category-filter` }
            onClick={ () => handleClick(categoryName) }
          >
            { categoryName }
          </button>
        ))}
        <button
          className={ path === 'meals'
            ? `${style.categoryBtns} ${style.allBtnMeals}`
            : `${style.categoryBtns} ${style.allBtnDrinks}` }
          data-testid="All-category-filter"
          onClick={ () => setCategoryData([]) }
        >
          All
        </button>
      </div>
      <div
        className={ style.categoryCardContainer }
      >
        { categoryData.length > 0 && path === 'meals' && (
          categoryData?.map(({ strMeal, strMealThumb, idMeal }: ItemMealType, index) => (
            <Link
              className={ style.recipeLink }
              key={ index }
              data-testid={ `${index}-recipe-card` }
              to={ `/meals/${idMeal}` }
            >
              <img
                className={ style.recipeImg }
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt="Meal Thumb"
              />
              <h2
                className={ style.recipeText }
                data-testid={ `${index}-card-name` }
              >
                { strMeal }
              </h2>
            </Link>
          )))}
      </div>
      <div
        className={ style.categoryCardContainer }
      >
        { categoryData.length > 0 && path === 'drinks' && (
          categoryData?.map(({ strDrink, strDrinkThumb, idDrink }
          : ItemDrinkType, index) => (
            <Link
              className={ style.recipeLink }
              key={ index }
              data-testid={ `${index}-recipe-card` }
              to={ `/drinks/${idDrink}` }
            >
              <img
                className={ style.recipeImg }
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt="Drink Thumb"
              />
              <h2
                className={ style.recipeText }
                data-testid={ `${index}-card-name` }
              >
                { strDrink }
              </h2>
            </Link>
          )))}
      </div>
      <div
        className={ style.categoryCardContainer }
      >
        { categoryData.length === 0 && path === 'meals' && (
          dataWith12Length?.map(({ strMeal, strMealThumb, idMeal }
          : ItemMealType, index) => (
            <Link
              className={ style.recipeLink }
              key={ index }
              data-testid={ `${index}-recipe-card` }
              to={ `/meals/${idMeal}` }
            >
              <img
                className={ style.recipeImg }
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt="Meal Thumb"
              />
              <h2
                className={ style.recipeText }
                data-testid={ `${index}-card-name` }
              >
                { strMeal }
              </h2>
            </Link>
          ))
        ) }
      </div>
      <div
        className={ style.categoryCardContainer }
      >
        { categoryData.length === 0 && path === 'drinks' && (
          dataWith12Length?.map(({ strDrink, strDrinkThumb, idDrink }
          : ItemDrinkType, index) => (
            <Link
              className={ style.recipeLink }
              key={ index }
              data-testid={ `${index}-recipe-card` }
              to={ `/drinks/${idDrink}` }
            >
              <img
                className={ style.recipeImg }
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt="Drink Thumb"
              />
              <h2
                className={ style.recipeText }
                data-testid={ `${index}-card-name` }
              >
                { strDrink }
              </h2>
            </Link>
          )))}
      </div>
    </div>
  );
}

export default Recipes;
