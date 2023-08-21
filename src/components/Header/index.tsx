import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { HeaderRouterProps } from './type';

function Header({ pageTitle, showSearchIcon }: HeaderRouterProps) {
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const navigate = useNavigate();

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
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search recipe"
        />
      )}
    </header>
  );
}

export default Header;
