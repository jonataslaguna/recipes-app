import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextRecipes from '../../context/ContextRecipes';

function SearchBar() {
  const {
    searchFormData,
    setSearchFormData,
    recipesSearchForm,
    handleSubmitSearchForm,
  } = useContext(ContextRecipes);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    if (type === 'radio') {
      setSearchFormData({ ...searchFormData, searchType: id, [id]: value });
    } else {
      setSearchFormData({ ...searchFormData, [id]: value });
    }
  };

  useEffect(() => {
    const navigateToPageDetails = () => {
      if (recipesSearchForm
        && recipesSearchForm.meals
        && recipesSearchForm.meals.length === 1) {
        navigate(`/meals/${recipesSearchForm.meals[0].idMeal}`);
      }
      if (recipesSearchForm
        && recipesSearchForm.drinks
        && recipesSearchForm.drinks.length === 1) {
        navigate(`/drinks/${recipesSearchForm.drinks[0].idDrink}`);
      }
    };
    navigateToPageDetails();
  }, [recipesSearchForm, navigate]);

  return (
    <form onSubmit={ handleSubmitSearchForm }>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Search recipe"
        id="searchInput"
        value={ searchFormData?.searchInput }
        onChange={ handleChange }
      />

      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="search-radio"
        id="ingredient"
        value="ingredient"
        onChange={ handleChange }
      />
      <label htmlFor="ingredient">Ingredient</label>

      <input
        data-testid="name-search-radio"
        type="radio"
        name="search-radio"
        id="name"
        value="name"
        onChange={ handleChange }
      />
      <label htmlFor="name">Name</label>

      <input
        data-testid="first-letter-search-radio"
        type="radio"
        name="search-radio"
        id="firstLetter"
        value="firstLetter"
        onChange={ handleChange }
      />
      <label htmlFor="firstLetter">First letter</label>

      <button data-testid="exec-search-btn">Search</button>
    </form>
  );
}

export default SearchBar;
