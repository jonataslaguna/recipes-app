import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { HeaderRouterProps } from './type';

function Header({ pageTitle, showSearchIcon }: HeaderRouterProps) {
  return (
    <header>
      <h1 data-testid="page-title">
        { pageTitle }
      </h1>
      { showSearchIcon
      && <img
        src={ searchIcon }
        alt="Search"
        data-testid="search-top-btn"
      /> }
      <img
        src={ profileIcon }
        alt="Profile"
        data-testid="profile-top-btn"
      />
    </header>
  );
}

export default Header;
