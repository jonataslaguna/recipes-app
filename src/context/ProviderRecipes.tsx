import { useState } from 'react';
import ContextRecipes from './ContextRecipes';
import { getFirstLetter, getIngredient, getName } from '../utils/api';
import { FavoriteRecipeType } from '../utils/types';

type ProviderRecipesProps = {
  children: React.ReactNode;
};

const InitialStateSearchForm = {
  searchInput: '',
  searchType: 'ingredient',
};

function ProviderRecipes({ children }: ProviderRecipesProps) {
  const [searchFormData, setSearchFormData] = useState(InitialStateSearchForm);
  const [recipesSearchForm, setRecipesSearchForm] = useState([{}]);
  const [pageName, setPageName] = useState('');
  const [btnClicked, setBtnClicked] = useState(false);
  const [favorite, setFavorite] = useState<FavoriteRecipeType>();

  const handleSubmitSearchForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { searchInput, searchType } = searchFormData;
    if (searchType === 'firstLetter' && searchInput.length > 1) {
      alert('Your search must have only 1 (one) character');
    } else if (searchType === 'ingredient') {
      setRecipesSearchForm(await getIngredient(searchInput, pageName));
    } else if (searchType === 'name') {
      setRecipesSearchForm(await getName(searchInput, pageName));
    } else if (searchType === 'firstLetter' && searchInput.length === 1) {
      setRecipesSearchForm(await getFirstLetter(searchInput, pageName));
    }
    setBtnClicked(true);
  };

  const handleAddToFavorites = (recipe: FavoriteRecipeType) => {
    setFavorite(recipe);
    const favorites = (JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'));
    if (!favorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
      return;
    }
    favorites.push(recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  };

  const handleRemoveFromFavorites = (id: any) => {
    const favorites = (JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'));
    if (favorites) {
      const newFavorites = favorites
        .filter((recipe: FavoriteRecipeType) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  };

  return (
    <ContextRecipes.Provider
      value={ {
        searchFormData,
        setSearchFormData,
        handleSubmitSearchForm,
        setPageName,
        recipesSearchForm,
        pageName,
        setRecipesSearchForm,
        btnClicked,
        setBtnClicked,
        handleAddToFavorites,
        handleRemoveFromFavorites,
      } }
    >
      {children}
    </ContextRecipes.Provider>
  );
}

export default ProviderRecipes;
