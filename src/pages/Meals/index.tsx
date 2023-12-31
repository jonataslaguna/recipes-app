import { useContext, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ContextRecipes from '../../context/ContextRecipes';
import Card from '../../components/Card';
import Recipes from '../../components/Recipes';
import styles from './meals.module.css';

function Meals() {
  const { recipesSearchForm, btnClicked, setBtnClicked } = useContext(ContextRecipes);
  useEffect(() => {
    if (btnClicked && (!recipesSearchForm
      || !recipesSearchForm.meals || recipesSearchForm.meals.length === 0)) {
      alert("Sorry, we haven't found any recipes for these filters.");
      setBtnClicked(false);
    }
  }, [recipesSearchForm, btnClicked, setBtnClicked]);

  return (
    <div>
      <Header pageTitle="Meals" showSearchIcon />
      {
        recipesSearchForm && recipesSearchForm.meals
        && recipesSearchForm.meals.length > 0
          ? (
            <div className={ styles.cardContainerMeals }>
              {recipesSearchForm.meals.map((recipe: any, index:number) => (
                <Card
                  key={ recipe.idMeal }
                  name={ recipe.strMeal }
                  img={ recipe.strMealThumb }
                  index={ index }
                  id={ recipe.idMeal }
                />
              ))}
            </div>
          ) : (
            <Recipes />
          )
      }
      <Footer />
    </div>
  );
}

export default Meals;
