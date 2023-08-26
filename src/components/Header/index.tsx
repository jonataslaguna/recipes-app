import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
/* import searchIcon from '../../images/searchIcon.svg'; */
import { HeaderRouterProps } from './type';
import SearchBar from '../SearchBar';
import ContextRecipes from '../../context/ContextRecipes';
import profileIcon2 from '../../images/profileIcon2.svg';
import profileIcon3 from '../../images/profileIcon3.svg';
import searchIcon2 from '../../images/searchIcon2.svg';
import logoIcon from '../../images/logoIcon.svg';
import iconBell from '../../images/iconBell.svg';
import styles from './styles.module.css';
import mealTitleIcon from '../../images/mealIcon.svg';
import drinkPageIcon from '../../images/drinkPageIcon.svg';

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
      <div className={ styles.headerIcons }>
        <div className={ styles.headerIconsPar1 }>
          <img src={ iconBell } alt="" />
          <img src={ logoIcon } alt="recipesAppIcon" />
        </div>
        <div className={ styles.headerIconsPar2 }>
          {showSearchIcon && (
            <button
              onClick={ handleClickSearchButton }
            >
              <img
                src={ searchIcon2 }
                alt="search"
                data-testid="search-top-btn"
              />
            </button>
          )}
          <button onClick={ () => navigate('/profile') }>
            <img
              src={ profileIcon2 }
              alt="profile"
              data-testid="profile-top-btn"
            />
          </button>
        </div>
      </div>
      <div className={ styles.titleIcon }>
        {pageTitle === 'Profile'
          ? <img src={ profileIcon3 } alt="icon" />
          : <img
              src={ pageTitle === 'Meals'
                ? mealTitleIcon : drinkPageIcon }
              alt="icon"
          />}
        <h1 data-testid="page-title">{pageTitle}</h1>
      </div>
      {showInputSearch && <SearchBar />}
    </header>
  );
}

export default Header;
