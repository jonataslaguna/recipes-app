import { screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { detailsDrinkMock, detailsMock } from './mocks/detailsMock';
import App from '../App';
import ProviderRecipes from '../context/ProviderRecipes';

describe('Testa o comportamento e renderização da tela de detalhes de uma receita ', async () => {
  const route = '/meals/52977';
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Testa se a tela de detalhes de uma receita é renderizada', async () => {
    renderWithRouter(<App />, { route });
    const title = screen.getByTestId('recipe-title');
    const ingredientsSection = screen.getByRole('heading', { name: /ingredients/i });
    const instructionsSection = screen.getByRole('heading', { name: /instructions/i });
    const videoSection = screen.getByRole('heading', { name: /video/i });
    const recommendationsSection = screen.getByRole('heading', { name: /recommendations/i });
    const startRecipeBtn = screen.getByRole('button', { name: /start recipe/i });
    expect(global.fetch).toHaveBeenCalled();
    expect(title).toBeInTheDocument();
    expect(ingredientsSection).toBeInTheDocument();
    expect(instructionsSection).toBeInTheDocument();
    expect(videoSection).toBeInTheDocument();
    expect(recommendationsSection).toBeInTheDocument();
    expect(startRecipeBtn).toBeInTheDocument();
    expect(startRecipeBtn).toBeEnabled();
  });
  it('Testa se a pagina realiza uma chamada na API e renderiza os dados corretamente', async () => {
    renderWithRouter(<App />, { route });
    expect(global.fetch).toHaveBeenCalled();

    expect(detailsMock.meals[0].strMeal).toBe('Corba');
    expect(detailsMock.meals[0].strCategory).toBe('Side');

    const returnButton = screen.getByRole('button', {
      name: /</i,
    });
    const shareButton = screen.getByTestId('share-btn');

    expect(returnButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    const ingredients = screen.getByRole('list');

    expect(ingredients).toBeInTheDocument();

    const recipeTitle = await screen.findByText('Corba');
    const recipeCategory = await screen.findByText('Side');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();

    const firstIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    const secondIngredient = await screen.findByTestId('1-ingredient-name-and-measure');

    expect(firstIngredient).toBeInTheDocument();
    expect(secondIngredient).toBeInTheDocument();
  });
  it('Testa a renderização dos elementos quando a receita é de um Drink', async () => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsDrinkMock,
    });
    renderWithRouter(<App />, { route: '/drinks/15997' });
    expect(global.fetch).toHaveBeenCalled();

    const recipeTitle = await screen.findByText('Martinez 2');
    const recipeCategory = await screen.findByText('Cocktail');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
  });
  it('Testa se o link da receita é copiado ao clicar no botão de compartilhar', async () => {
    renderWithRouter(<App />, { route });
    expect(global.fetch).toHaveBeenCalled();

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();

    await userEvent.click(shareButton);

    const alertMsg = await screen.findByText('Link copied!');
    const dismissButton = await screen.getByRole('button', {
      name: /close alert/i,
    });
    expect(dismissButton).toBeInTheDocument();
    expect(alertMsg).toBeInTheDocument();

    await userEvent.click(dismissButton);

    expect(alertMsg).not.toBeInTheDocument();
    expect(dismissButton).not.toBeInTheDocument();

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
  });
  it('Testa se a receita é favoritada ao clicar no botão de favoritar', async () => {
    renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route },
    );
    expect(global.fetch).toHaveBeenCalled();

    const favoriteButton = screen.getByTestId('favorite-btn');
    const shareButton = screen.getByTestId('share-btn');
    const returnButton = screen.getByRole('button', {
      name: /</i,
    });
    expect(favoriteButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartBtn.svg');

    await userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');

    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    expect(getLocalStorage).toHaveLength(1);

    await userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartBtn.svg');

    await userEvent.click(returnButton);

    const profileButton = screen.getByRole('img', {
      name: /profile/i,
    });
    const pageTitle = screen.getByRole('heading', {
      name: /meals/i,
    });

    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('Testa se o carousel de recomendações é renderizado', async () => {
    renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route },
    );
    expect(global.fetch).toHaveBeenCalled();

    const recommendationsSection = screen.getByRole('heading', {
      name: /recommendations/i,
    });
    expect(recommendationsSection).toBeInTheDocument();
  });
});
