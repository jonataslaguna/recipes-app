import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import style from './Profile.module.css';
import doneIcon from '../../images/doneBtn.svg';
import favoriteIcon from '../../images/favoriteBtn.svg';
import logoutIcon from '../../images/logoutBtn.svg';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getEmail = localStorage.getItem('user');
    if (getEmail) {
      const { email } = JSON.parse(getEmail);
      setUserEmail(email);
    }
  }, []);

  const navigateToDoneRecipes = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/done-recipes');
  };

  const navigateToFavoriteRecipes = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/favorite-recipes');
  };

  const navigateToLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Header pageTitle="Profile" />

      <form
        className={ style.profileForm }
      >
        <p
          className={ style.profileEmail }
          data-testid="profile-email"
        >
          {userEmail}
        </p>
        <button
          className={ style.btn }
          type="button"
          data-testid="profile-done-btn"
          onClick={ navigateToDoneRecipes }
        >
          <img
            className={ style.iconBtn }
            src={ doneIcon }
            alt="done icon"
          />
          Done Recipes
        </button>
        <button
          className={ style.btn }
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ navigateToFavoriteRecipes }
        >
          <img
            className={ style.iconBtn }
            src={ favoriteIcon }
            alt="done icon"
          />
          Favorite Recipes
        </button>
        <button
          className={ ` ${style.btn} ${style.logoutBtn}` }
          type="button"
          data-testid="profile-logout-btn"
          onClick={ navigateToLogout }
        >
          <img
            className={ style.iconBtn }
            src={ logoutIcon }
            alt="done icon"
          />
          Logout
        </button>
      </form>
      <Footer />
    </>
  );
}

export default Profile;
