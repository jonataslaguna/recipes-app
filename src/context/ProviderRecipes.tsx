import { useState } from 'react';
import ContextRecipes from './ContextRecipes';
import { getFirstLetter, getIngredient, getName } from '../utils/api';

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

  const handleSubmitSearchForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { searchInput, searchType } = searchFormData;

    if (searchType === 'ingredient') {
      setRecipesSearchForm(await getIngredient(searchInput, pageName));
    } else if (searchType === 'name') {
      setRecipesSearchForm(await getName(searchInput, pageName));
    } else if (searchType === 'firstLetter' && searchInput.length === 1) {
      setRecipesSearchForm(await getFirstLetter(searchInput, pageName));
    } else {
      alert('Your search must have only 1 (one) character');
    }
  };

  return (
    <ContextRecipes.Provider
      value={ {
        searchFormData,
        setSearchFormData,
        handleSubmitSearchForm,
        setPageName,
      } }
    >
      {children}
    </ContextRecipes.Provider>
  );
}

export default ProviderRecipes;
