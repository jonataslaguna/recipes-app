import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

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

      <form>
        <p data-testid="profile-email">
          {userEmail}
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ navigateToDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ navigateToFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ navigateToLogout }
        >
          Logout
        </button>
      </form>
      <Footer />
    </>
  );
}

export default Profile;
