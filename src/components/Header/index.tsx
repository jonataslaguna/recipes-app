import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { HeaderRouterProps } from './type';
import { getFirstLetter, getIngredient, getName } from '../../utils/api';

const InitialState = {
  searchInput: '',
  searchType: 'ingredient',
};

function Header({ pageTitle, showSearchIcon }: HeaderRouterProps) {
  const [inputsData, setInputsData] = useState(InitialState);
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [recipes, setRecipes] = useState([{}]);

  const navigate = useNavigate();

  const handleSubmitFormSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { searchInput, searchType } = inputsData;

    if (searchType === 'ingredient') {
      setRecipes(await getIngredient(searchInput));
    } else if (searchType === 'name') {
      setRecipes(await getName(searchInput));
    } else if (searchType === 'firstLetter' && searchInput.length === 1) {
      setRecipes(await getFirstLetter(searchInput));
    } else {
      alert('Your search must have only 1 (one) character');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    if (type === 'radio') {
      setInputsData({ ...inputsData, searchType: id, [id]: value });
    } else {
      setInputsData({ ...inputsData, [id]: value });
    }
  };

  const handleClickSearchButton = () => {
    setShowSearchBtn(!showSearchBtn);
  };

  return (
    <header>
      <h1 data-testid="page-title">{pageTitle}</h1>
      <button onClick={ () => navigate('/profile') }>
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </button>
      {showSearchIcon && (
        <button
          onClick={ handleClickSearchButton }
        >
          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>
      )}

      {showSearchBtn && (
        <form onSubmit={ handleSubmitFormSearch }>
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search recipe"
            id="searchInput"
            value={ inputsData.searchInput }
            onChange={ handleChange }
          />

          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="search-radio"
            id="ingredient"
            checked
            onChange={ handleChange }
          />
          <label htmlFor="ingredient">Ingredient</label>

          <input
            data-testid="name-search-radio"
            type="radio"
            name="search-radio"
            id="name"
            onChange={ handleChange }
          />
          <label htmlFor="name">Name</label>

          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="search-radio"
            id="firstLetter"
            onChange={ handleChange }
          />
          <label htmlFor="firstLetter">First letter</label>

          <button data-testid="exec-search-btn">Search</button>
        </form>

      )}
    </header>
  );
}

export default Header;
