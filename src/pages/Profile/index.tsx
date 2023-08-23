import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Profile() {
  return (
    <>
      <Header pageTitle="Profile" />

      <form>
        <input type="email" data-testid="profile-email" />
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
