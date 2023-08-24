import React from 'react';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { detailsMock } from './mocks/detailsMock';

describe('Testa o comportamento e renderização da tela de detalhes de uma receita ', () => {
  const route = '/meals/52771/in-progress';
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Testa a tela de receitas em progresso', async () => {
    renderWithRouter(<App />, { route });

    const title = screen.getByRole('heading', { name: /receita em progresso/i });
    const ingredientsSection = screen.getByRole('heading', { name: /ingredients/i });
    const instructionsSection = screen.getByRole('heading', { name: /instructions/i });
    const btnFinish = screen.getByRole('button', { name: /finalizar receita/i });

    expect(global.fetch).toHaveBeenCalled();
    expect(title).toBeInTheDocument();
    expect(ingredientsSection).toBeInTheDocument();
    expect(instructionsSection).toBeInTheDocument();
    expect(btnFinish).toBeInTheDocument();
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
    renderWithRouter(<App />, { route });
    expect(global.fetch).toHaveBeenCalled();

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
  });
});
