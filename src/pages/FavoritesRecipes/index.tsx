import FavoriteRecipes from '../../components/FavoriteRecipes';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function FavoritesRecipes() {
  return (
    <div>
      <Header pageTitle="Favorite Recipes" />
      <FavoriteRecipes />
      <Footer />
    </div>
  );
}

export default FavoritesRecipes;
