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
  it('Testa se a tela de detalhes de uma receita é renderizada', async () => {
    renderWithRouter(<App />, { route: '/meals/52977' });
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
    renderWithRouter(<App />, { route: '/meals/52977' });
    expect(global.fetch).toHaveBeenCalled();
  });
});
