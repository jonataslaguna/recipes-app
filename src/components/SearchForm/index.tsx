import { useContext } from 'react';
import ContextRecipes from '../../context/ContextRecipes';

function SearchForm() {
  const {
    searchFormData,
    handleSubmitSearchForm,
    setSearchFormData,
  } = useContext(ContextRecipes);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    if (type === 'radio') {
      setSearchFormData({ ...searchFormData, searchType: id, [id]: value });
    } else {
      setSearchFormData({ ...searchFormData, [id]: value });
    }
  };
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
        checked
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

export default SearchForm;
