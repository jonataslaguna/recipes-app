import React from 'react';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { detailsDrinkMock, detailsMock } from './mocks/detailsMock';
import ProviderRecipes from '../context/ProviderRecipes';

describe('Testa o comportamento e renderização da tela de detalhes de uma comida ', () => {
  const route = '/meals/52977/in-progress';

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Testa a tela de receitas em progresso', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsMock,
    });
    renderWithRouter(<App />, { route });

    const title = screen.getByRole('heading', { name: /receita em progresso/i });
    const ingredientsSection = screen.getByRole('heading', { name: /ingredients/i });
    const instructionsSection = screen.getByRole('heading', { name: /instructions/i });
    const btnFinish = screen.getByRole('button', { name: /finalizar receita/i });
    const recipePicture = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');

    expect(global.fetch).toHaveBeenCalled();
    expect(title).toBeInTheDocument();
    expect(ingredientsSection).toBeInTheDocument();
    expect(instructionsSection).toBeInTheDocument();
    expect(btnFinish).toBeInTheDocument();
    expect(recipePicture).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
  });
  it('Testa se o link da receita é copiado ao clicar no botão de compartilhar', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsMock,
    });
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
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsMock,
    });
    renderWithRouter(<App />, { route });
    expect(global.fetch).toHaveBeenCalled();

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
  });
  it('Testa a finalizacao da receita', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsMock,
    });
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route },
    );

    const checkbox1 = await screen.findByTestId('0-ingredient-step');
    const checkbox2 = await screen.findByTestId('1-ingredient-step');
    const checkbox3 = await screen.findByTestId('2-ingredient-step');
    const checkbox4 = await screen.findByTestId('3-ingredient-step');
    const checkbox5 = await screen.findByTestId('4-ingredient-step');
    const checkbox6 = await screen.findByTestId('5-ingredient-step');
    const checkbox7 = await screen.findByTestId('6-ingredient-step');
    const checkbox8 = await screen.findByTestId('7-ingredient-step');
    const checkbox9 = await screen.findByTestId('8-ingredient-step');
    const checkbox10 = await screen.findByTestId('9-ingredient-step');
    const checkbox11 = await screen.findByTestId('10-ingredient-step');
    const checkbox12 = await screen.findByTestId('11-ingredient-step');
    const checkbox13 = await screen.findByTestId('12-ingredient-step');

    expect(checkbox1).toBeInTheDocument();
    expect(checkbox2).toBeInTheDocument();
    expect(checkbox3).toBeInTheDocument();
    expect(checkbox4).toBeInTheDocument();
    expect(checkbox5).toBeInTheDocument();
    expect(checkbox6).toBeInTheDocument();
    expect(checkbox7).toBeInTheDocument();
    expect(checkbox8).toBeInTheDocument();
    expect(checkbox9).toBeInTheDocument();
    expect(checkbox10).toBeInTheDocument();
    expect(checkbox11).toBeInTheDocument();
    expect(checkbox12).toBeInTheDocument();
    expect(checkbox13).toBeInTheDocument();

    const btnFinishRecipe = screen.getByRole('button', { name: /finalizar receita/i });

    await userEvent.click(checkbox1);
    await userEvent.click(checkbox2);
    await userEvent.click(checkbox3);
    await userEvent.click(checkbox4);
    await userEvent.click(checkbox5);
    await userEvent.click(checkbox6);
    await userEvent.click(checkbox7);
    await userEvent.click(checkbox8);
    await userEvent.click(checkbox9);
    await userEvent.click(checkbox10);
    await userEvent.click(checkbox11);
    await userEvent.click(checkbox12);
    await userEvent.click(checkbox13);

    expect(btnFinishRecipe).not.toBeDisabled();

    await user.click(btnFinishRecipe);
  });
});

describe('Testa o comportamento e renderização da tela de detalhes de um Drink', () => {
  const route = '/drinks/17256/in-progress';

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Testa a renderização dos elementos quando a receita é de um Drink', async () => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsDrinkMock,
    });
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route },
    );

    const recipeTitle = await screen.findByText('Martinez 2');
    const recipeCategory = await screen.findByText('Cocktail');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();

    const checkbox14 = await screen.findByTestId('0-ingredient-step');
    const checkbox15 = await screen.findByTestId('1-ingredient-step');
    const checkbox16 = await screen.findByTestId('2-ingredient-step');
    const checkbox17 = await screen.findByTestId('3-ingredient-step');

    expect(checkbox14).toBeInTheDocument();
    expect(checkbox15).toBeInTheDocument();
    expect(checkbox16).toBeInTheDocument();
    expect(checkbox17).toBeInTheDocument();

    const btnFinishRecipe2 = screen.getByRole('button', { name: /finalizar receita/i });

    expect(btnFinishRecipe2).toBeDisabled();

    await userEvent.click(checkbox14);
    await userEvent.click(checkbox15);
    await userEvent.click(checkbox16);
    await userEvent.click(checkbox17);

    await user.click(btnFinishRecipe2);

    expect(window.location.pathname).toBe('/done-recipes');

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');

    const recipeDone = doneRecipes[1];

    expect(recipeDone).toMatchObject({
      id: '17256',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Martinez 2',
      image: 'https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg',
      doneDate: expect.any(String),
      tags: [],
    });
  });
});
