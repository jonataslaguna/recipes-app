import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { HeaderRouterProps } from './type';
import SearchForm from '../SearchForm';

function Header({ pageTitle, showSearchIcon }: HeaderRouterProps) {
  const [showInputSearch, setShowInputSearch] = useState(false);

  const navigate = useNavigate();

  const handleClickSearchButton = () => {
    setShowInputSearch(!showInputSearch);
  };

  return (
    <header>
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
      <button onClick={ () => navigate('/profile') }>
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </button>

      {showInputSearch && <SearchForm />}
    </header>
  );
}

export default Header;
