import { useContext, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ContextRecipes from '../../context/ContextRecipes';
import Card from '../../components/Card';

function Meals() {
  const { recipesSearchForm } = useContext(ContextRecipes);

  useEffect(() => {
    if (!recipesSearchForm
      || !recipesSearchForm.meals || recipesSearchForm.meals.length === 0) {
      alert("Sorry, we haven't found any recipes for these filters.");
    }
  }, [recipesSearchForm]);

  return (
    <div>
      <Header pageTitle="Meals" showSearchIcon />
      {
        recipesSearchForm && recipesSearchForm.meals
        && recipesSearchForm.meals.length > 0
         && (
           recipesSearchForm.meals.map((recipe: any, index:number) => (
             <Card
               key={ recipe.idMeal }
               name={ recipe.strMeal }
               img={ recipe.strMealThumb }
               index={ index }
             />
           )))
      }
      <Footer />
    </div>
  );
}

export default Meals;
