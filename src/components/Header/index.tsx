import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { HeaderRouterProps } from './type';
import SearchBar from '../SearchBar';
import ContextRecipes from '../../context/ContextRecipes';

function Header({ pageTitle, showSearchIcon }: HeaderRouterProps) {
  const { setPageName } = useContext(ContextRecipes);
  const [showInputSearch, setShowInputSearch] = useState(false);

  const navigate = useNavigate();

  const handleClickSearchButton = () => {
    setShowInputSearch(!showInputSearch);
  };

  useEffect(() => {
    setPageName(pageTitle);
  }, [pageTitle, setPageName]);

  return (
    <header>
      <button onClick={ () => navigate('/profile') }>
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </button>
      <h1 data-testid="page-title">{pageTitle}</h1>
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

      {showInputSearch && <SearchBar />}
    </header>
  );
}

export default Header;
