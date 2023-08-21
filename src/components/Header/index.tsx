import { useNavigate } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { HeaderRouterProps } from './type';

function Header({ pageTitle, showSearchIcon }: HeaderRouterProps) {
  const navigate = useNavigate();

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
        <button>
          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>
      )}
    </header>
  );
}

export default Header;
