import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import ProviderRecipes from '../context/ProviderRecipes';
import { detailsDrinkMock, detailsMock } from './mocks/detailsMock';

describe('Testa a tela de Receitas favoritas e seu comportamento', () => {
  it('Verifica se a tela de receitas favoritas é renderizada', async () => {
    renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/favorite-recipes' },
    );

    const pageTitle = await screen.findByRole('heading', {
      name: /favorite recipes/i,
    });
    const filterByAll = screen.getByRole('button', {
      name: /all/i,
    });
    const filterByMeals = screen.getByRole('button', {
      name: /meals/i,
    });
    const filterByDrinks = screen.getByRole('button', {
      name: /drinks/i,
    });

    expect(pageTitle).toBeInTheDocument();
    expect(filterByAll).toBeInTheDocument();
    expect(filterByMeals).toBeInTheDocument();
    expect(filterByDrinks).toBeInTheDocument();
  });
  it('Testa se ao favoritar uma receita, ela é renderizada na tela de receitas favoritas', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsMock,
    });

    renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals/52977' },
    );
    const recipeTitle = await screen.findByText('Corba');
    const favoriteButton = screen.getByTestId('favorite-btn');
    const returnButton = screen.getByRole('button', {
      name: /</i,
    });

    expect(recipeTitle).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(returnButton).toBeInTheDocument();

    await userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');

    await userEvent.click(returnButton);

    const profileButton = screen.getByRole('img', {
      name: /profile/i,
    });

    expect(profileButton).toBeInTheDocument();
    await userEvent.click(profileButton);

    const profilePageTitle = screen.getByRole('heading', {
      name: /profile/i,
    });
    const favoritesPageButton = screen.getByRole('button', {
      name: /favorite recipes/i,
    });

    expect(profilePageTitle).toBeInTheDocument();
    expect(favoritesPageButton).toBeInTheDocument();

    await userEvent.click(favoritesPageButton);

    const favoritesRecipesHeader = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });
    const filterByDrink = screen.getByRole('button', {
      name: /drinks/i,
    });
    const filterByMeal = screen.getByRole('button', {
      name: /meals/i,
    });
    const favoriteRecipeTitle = await screen.findByText('Corba');
    const favoriteOnLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    expect(favoritesRecipesHeader).toBeInTheDocument();
    expect(favoriteRecipeTitle).toBeInTheDocument();
    expect(favoriteOnLocalStorage).toHaveLength(1);
    expect(filterByDrink).toBeInTheDocument();
    expect(filterByMeal).toBeInTheDocument();

    await userEvent.click(filterByDrink);

    expect(favoriteRecipeTitle).not.toBeInTheDocument();
  });
  it('Testa os filtros de receitas favoritas, o botão de compartilhar e o de desfavoritar', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsDrinkMock,
    });

    renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/drinks/17256' },
    );

    expect(global.fetch).toHaveBeenCalled();

    const recipeTitle = await screen.findByRole('heading', {
      name: /martinez 2/i,
    });
    const favoriteButton = screen.getByTestId('favorite-btn');
    const returnButton = screen.getByRole('button', {
      name: /</i,
    });

    expect(recipeTitle).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(returnButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    await userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');

    await userEvent.click(returnButton);

    const profileButton = screen.getByRole('img', {
      name: /profile/i,
    });

    expect(profileButton).toBeInTheDocument();
    await userEvent.click(profileButton);

    const profilePageTitle = screen.getByRole('heading', {
      name: /profile/i,
    });
    const favoritesPageButton = screen.getByRole('button', {
      name: /favorite recipes/i,
    });

    expect(profilePageTitle).toBeInTheDocument();
    expect(favoritesPageButton).toBeInTheDocument();

    await userEvent.click(favoritesPageButton);

    const favoritesRecipesHeader = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });
    const filterByAll = screen.getByRole('button', {
      name: /all/i,
    });
    const filterByDrink = screen.getByRole('button', {
      name: /drinks/i,
    });
    const filterByMeal = screen.getByRole('button', {
      name: /meals/i,
    });

    expect(filterByDrink).toBeInTheDocument();
    expect(filterByMeal).toBeInTheDocument();
    expect(filterByAll).toBeInTheDocument();
    expect(favoritesRecipesHeader).toBeInTheDocument();

    const favoriteDrinkRecipeTitle = await screen.findByText('Martinez 2');
    const favoriteMealRecipeTitle = await screen.findByText('Corba');
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    expect(favoriteDrinkRecipeTitle).toBeInTheDocument();
    expect(favoriteMealRecipeTitle).toBeInTheDocument();
    expect(favoritesLocalStorage).toHaveLength(2);
    expect(favoritesLocalStorage[0].id).toBe('52977');

    const shareButtonFirstItem = screen.getByTestId('0-horizontal-share-btn');
    const shareButtonSecondItem = screen.getByTestId('1-horizontal-share-btn');
    const favoriteButtonFirstItem = screen.getByTestId('0-horizontal-favorite-btn');
    const favoriteButtonSecondItem = screen.getByTestId('1-horizontal-favorite-btn');

    expect(shareButtonFirstItem).toBeInTheDocument();
    expect(shareButtonSecondItem).toBeInTheDocument();
    expect(favoriteButtonFirstItem).toBeInTheDocument();
    expect(favoriteButtonSecondItem).toBeInTheDocument();

    await userEvent.click(shareButtonFirstItem);

    const alertClipboardMsg = screen.getByText(/link copied!/i);
    const dismissAlert = screen.getByRole('button', {
      name: /close alert/i,
    });

    expect(alertClipboardMsg).toBeInTheDocument();
    expect(dismissAlert).toBeInTheDocument();

    await userEvent.click(dismissAlert);

    expect(alertClipboardMsg).not.toBeInTheDocument();

    await userEvent.click(filterByMeal);

    expect(favoriteDrinkRecipeTitle).not.toBeInTheDocument();
    expect(favoriteMealRecipeTitle).toBeInTheDocument();

    await userEvent.click(filterByAll);

    const favoriteDrinkRecipeTitleAfterFilter = await screen.findByText('Martinez 2');
    expect(favoriteDrinkRecipeTitleAfterFilter).toBeInTheDocument();

    await userEvent.click(favoriteButtonFirstItem);

    expect(favoriteDrinkRecipeTitle).not.toBeInTheDocument();
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    expect(getLocalStorage).toHaveLength(1);
    expect(favoriteMealRecipeTitle).toBeInTheDocument();

    await userEvent.click(favoriteMealRecipeTitle);

    expect(filterByAll).not.toBeInTheDocument();
    expect(filterByMeal).not.toBeInTheDocument();
    expect(filterByDrink).not.toBeInTheDocument();
    expect(favoritesRecipesHeader).not.toBeInTheDocument();

    const ingredientsSection = screen.getByRole('heading', {
      name: /ingredients/i,
    });

    expect(ingredientsSection).toBeInTheDocument();
  });
});
