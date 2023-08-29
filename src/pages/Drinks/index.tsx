import { useContext, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ContextRecipes from '../../context/ContextRecipes';
import Card from '../../components/Card';
import Recipes from '../../components/Recipes';
import styles from './drinks.module.css';

function Drinks() {
  const { recipesSearchForm, btnClicked, setBtnClicked } = useContext(ContextRecipes);

  useEffect(() => {
    if (btnClicked && (!recipesSearchForm
      || !recipesSearchForm.drinks || recipesSearchForm.drinks.length === 0)) {
      alert("Sorry, we haven't found any recipes for these filters.");
      setBtnClicked(false);
    }
  }, [recipesSearchForm, btnClicked, setBtnClicked]);

  return (
    <div>
      <Header pageTitle="Drinks" showSearchIcon />
      {
        recipesSearchForm && recipesSearchForm.drinks
        && recipesSearchForm.drinks.length > 0
          ? (
            <div className={ styles.cardContainerDrinks }>
              {recipesSearchForm.drinks.slice(0, 12).map((recipe: any, index:number) => (
                <Card
                  key={ recipe.idDrink }
                  img={ recipe.strDrinkThumb }
                  name={ recipe.strDrink }
                  index={ index }
                  id={ recipe.idDrink }
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

export default Drinks;
