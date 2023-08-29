import React from 'react';
import { screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { categoriesDataMock, drinksCategoriesDataMock } from './mocks/categoriesMock';
import { beefMealsDataMock, breakfastMealsDataMock, cocktailsDrinksMock, drinksDataMock, mealsDataMock } from './mocks/recipesData';
import ProviderRecipes from '../context/ProviderRecipes';
import App from '../App';
import { filterCocoaDrinksMock } from './mocks/recipesMock';

describe('Testando a tela de receitas', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mealsDataMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Verifica se a lista de receitas da página principal é renderizada', async () => {
    renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );
    expect(global.fetch).toHaveBeenCalled();

    const headerImg = screen.getByRole('img', {
      name: /recipesappicon/i,
    });
    const searchIcon = screen.getByRole('img', {
      name: /search/i,
    });
    const profileIcon = screen.getByRole('img', {
      name: /profile/i,
    });
    const mainTitle = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(mainTitle).toBeInTheDocument();
    expect(headerImg).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();

    const link = await screen.findByRole('link', {
      name: /meal thumb corba/i,
    });

    within(link).getByRole('img', {
      name: /meal thumb/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/meals/52977');
  });
  it('Verifica se os filtros estão funcionando ao serem aplicados ', async () => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => categoriesDataMock,
    });
    renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );
    expect(global.fetch).toHaveBeenCalled();

    const filterBeef = await screen.findByRole('button', {
      name: /beef/i,
    });
    const filterBreakfast = await screen.findByRole('button', {
      name: /breakfast/i,
    });

    expect(filterBeef).toBeInTheDocument();
    expect(filterBreakfast).toBeInTheDocument();

    vi.clearAllMocks();

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => beefMealsDataMock,
    });
    await userEvent.click(filterBeef);

    expect(global.fetch).toHaveBeenCalled();

    const firstBeefMeal = screen.getByRole('link', {
      name: /meal thumb beef and mustard pie/i,
    });

    within(firstBeefMeal).getByRole('img', {
      name: /meal thumb/i,
    });

    const beefs = await screen.getAllByRole('img', {
      name: /meal thumb/i,
    });

    expect(beefs).toHaveLength(12);
    expect(firstBeefMeal).toBeInTheDocument();

    await userEvent.click(filterBeef);
    expect(firstBeefMeal).not.toBeInTheDocument();

    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => breakfastMealsDataMock,
    });

    await userEvent.click(filterBreakfast);

    expect(global.fetch).toHaveBeenCalled();

    const allBreakfasts = await screen.getAllByRole('img', {
      name: /meal thumb/i,
    });

    expect(allBreakfasts).toHaveLength(7);

    const filterByAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(filterByAll).toBeInTheDocument();

    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mealsDataMock,
    });

    await userEvent.click(filterByAll);
  });
  it('Testa se a lista de bebidas é renderizada ao clicar no botão de bebidas', async () => {
    renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );
    const drinksIcon = screen.getByRole('img', {
      name: /drink icon/i,
    });
    expect(drinksIcon).toBeInTheDocument();

    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => drinksDataMock,
    });

    await userEvent.click(drinksIcon);

    expect(global.fetch).toHaveBeenCalled();

    const drinksPageTitle = screen.getByRole('heading', {
      name: /drinks/i,
    });
    const firstDrink = screen.getByRole('link', {
      name: /drink thumb gg/i,
    });

    within(firstDrink).getByRole('img', {
      name: /drink thumb/i,
    });

    expect(drinksPageTitle).toBeInTheDocument();
    expect(firstDrink).toBeInTheDocument();
  });
  it('Testa se as categorias das bebidas é renderizada corretamente na página', async () => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => drinksCategoriesDataMock,
    });
    renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/drinks' },
    );

    expect(global.fetch).toHaveBeenCalled();

    const cocktailsFilter = await screen.findByRole('button', {
      name: /cocktail/i,
    });
    const cocoaFilter = await screen.findByRole('button', {
      name: /cocoa/i,
    });
    expect(cocktailsFilter).toBeInTheDocument();
    expect(cocoaFilter).toBeInTheDocument();

    vi.clearAllMocks();

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => cocktailsDrinksMock,
    });

    await userEvent.click(cocktailsFilter);

    expect(global.fetch).toHaveBeenCalled();

    const firstDrinkTitle = screen.getByRole('heading', {
      name: /155 belmont/i,
    });

    const allDrinks = await screen.getAllByRole('img', {
      name: /drink thumb/i,
    });
    expect(firstDrinkTitle).toBeInTheDocument();
    expect(allDrinks).toHaveLength(12);

    await userEvent.click(cocktailsFilter);
    expect(firstDrinkTitle).not.toBeInTheDocument();

    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => filterCocoaDrinksMock,
    });

    await userEvent.click(cocoaFilter);

    expect(global.fetch).toHaveBeenCalled();

    const allCocoaDrinks = await screen.getAllByRole('img', {
      name: /drink thumb/i,
    });

    expect(allCocoaDrinks).toHaveLength(9);
  });
  it('Testa uma tela que não existe', async () => {
    renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/foods' },
    );
    expect(screen.getByRole('heading', {
      name: /not found/i,
    })).toBeInTheDocument();
  });
  it('Testa se você é redirecionado para a tela de detalhes da receita', async () => {
    renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );

    expect(global.fetch).toHaveBeenCalled();
    expect(window.location.pathname).toBe('/meals');
  });
});
