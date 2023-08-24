import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getEmail = localStorage.getItem('user');
    if (getEmail) {
      const { email } = JSON.parse(getEmail);
      setUserEmail(email);
    }
  }, []);
  return (
    <>
      <Header pageTitle="Profile" />

      <form>
        <p data-testid="profile-email">
          {userEmail}
        </p>
        <button
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </form>
      <Footer />
    </>
  );
}

export default Profile;
