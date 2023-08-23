import { useContext, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ContextRecipes from '../../context/ContextRecipes';
import Card from '../../components/Card';
import Recipes from '../../components/Recipes';

function Drinks() {
  const { recipesSearchForm } = useContext(ContextRecipes);

  useEffect(() => {
    if (!recipesSearchForm
      || !recipesSearchForm.drinks || recipesSearchForm.drinks.length === 0) {
      alert("Sorry, we haven't found any recipes for these filters.");
    }
  }, [recipesSearchForm]);

  return (
    <div>
      <Header pageTitle="Drinks" showSearchIcon />
      {
        recipesSearchForm && recipesSearchForm.drinks
        && recipesSearchForm.drinks.length > 0
          ? (
            recipesSearchForm.drinks.slice(0, 12).map((recipe: any, index:number) => (
              <Card
                key={ recipe.idDrink }
                img={ recipe.strDrinkThumb }
                name={ recipe.strDrink }
                index={ index }
              />
            )))
          : (
            <Recipes />
          )
      }
      <Footer />
    </div>
  );
}

export default Drinks;
