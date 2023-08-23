import React from 'react';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { detailsMock } from './mocks/detailsMock';

describe('Testa o comportamento e renderização da tela de detalhes de uma receita ', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Testa a tela de receitas em progresso', async () => {
    renderWithRouter(<App />, { route: '/meals/52771/in-progress' });

    const title = screen.getByRole('heading', { name: /receita em progresso/i });
    const recipeTitle = screen.getByRole('button', { name: /compartilhar/i });
    const ingredientsSection = screen.getByRole('heading', { name: /ingredients/i });
    const instructionsSection = screen.getByRole('heading', { name: /instructions/i });
    const btnShare = screen.getByRole('button', { name: /compartilhar/i });
    const btnFav = screen.getByRole('button', { name: /favoritar/i });
    const btnFinish = screen.getByRole('button', { name: /finalizar receita/i });

    expect(global.fetch).toHaveBeenCalled();
    expect(title).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(ingredientsSection).toBeInTheDocument();
    expect(instructionsSection).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
    expect(btnFav).toBeInTheDocument();
    expect(btnFinish).toBeInTheDocument();
  });
});
