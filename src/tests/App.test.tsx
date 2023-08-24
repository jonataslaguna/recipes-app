import React from 'react';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import ProviderRecipes from '../context/ProviderRecipes';
// import { recipesMockIngredients } from './mocks/recipesMock';
import { mealsAndDrinksMocks } from './mocks/mealsAndDrinksMocks';

describe('Testes do App', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mealsAndDrinksMocks,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Testes no componente login', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
    );
    const input = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await user.type(input, 'teste');
    await user.type(password, '123');
    expect(button).toBeDisabled();

    user.clear(input);
    user.clear(password);

    await user.type(input, 'email@teste.com');
    await user.type(password, '1234567');
    expect(button).not.toBeDisabled();
    await user.click(button);
    expect(window.location.pathname).toBe('/meals');
  });
  it('Testes no componente Header', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    const profileBtn = screen.getByRole('img', { name: /profile/i });
    const searchBtn = screen.getByRole('img', { name: /search/i });
    await user.click(searchBtn);
    const searchInput = screen.getByRole('textbox');
    expect(screen.getByText(/ingredient/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/first letter/i)).toBeInTheDocument();
    await user.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();

    await user.click(profileBtn);
    expect(screen.getByTestId('page-title'));
  });
  it('Testes no componente Footer', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    await user.click(drinksBtn);
    expect(window.location.pathname).toBe('/drinks');

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    await user.click(mealsBtn);
    expect(window.location.pathname).toBe('/meals');
  });
  it('Testes no componente SearchBar', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );
    const searchBtn = screen.getByRole('img', { name: /search/i });
    await user.click(searchBtn);
    const searchInput = screen.getByRole('textbox');
    expect(screen.getByText(/ingredient/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/first letter/i)).toBeInTheDocument();
    const btnSubmit = screen.getByRole('button', { name: 'Search' });
    await user.type(searchInput, 'teste');
    expect(searchInput).toHaveValue('teste');
    user.clear(searchInput);
    await user.click(screen.getByText(/first letter/i));
    await user.type(searchInput, 'aa');
    await user.click(btnSubmit);
  });
  it('Testes no componente Profile', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/profile' },
    );

    const doneRecipesBtn = screen.getByRole('button', {
      name: /done recipes/i,
    });
    await user.click(doneRecipesBtn);
    expect(window.location.pathname).toBe('/done-recipes');

    const profileBtn = screen.getByTestId('profile-top-btn');
    await user.click(profileBtn);
    expect(window.location.pathname).toBe('/profile');

    const favoriteRecipesBtn = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    await user.click(favoriteRecipesBtn);
    expect(window.location.pathname).toBe('/favorite-recipes');

    const profileButton = screen.getByRole('button', {
      name: /profile/i,
    });
    await user.click(profileButton);
    expect(window.location.pathname).toBe('/profile');

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });
    await user.click(logoutBtn);
    expect(window.location.pathname).toBe('/');
  });
});
