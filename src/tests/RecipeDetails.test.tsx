import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o comportamento e renderização da tela de detalhes de uma receita ', () => {
  it('Testa se a tela de detalhes de uma receita é renderizada', async () => {
    renderWithRouter(<App />, { route: '/meals/52977' });
    const title = screen.getByTestId('recipe-title');
    const ingredientsSection = screen.getByRole('heading', { name: /ingredients/i });
    const instructionsSection = screen.getByRole('heading', { name: /instructions/i });
    const videoSection = screen.getByRole('heading', { name: /video/i });
    const recommendationsSection = screen.getByRole('heading', { name: /recommendations/i });
    const startRecipeBtn = screen.getByRole('button', { name: /start recipe/i });
    expect(title).toBeInTheDocument();
    expect(ingredientsSection).toBeInTheDocument();
    expect(instructionsSection).toBeInTheDocument();
    expect(videoSection).toBeInTheDocument();
    expect(recommendationsSection).toBeInTheDocument();
    expect(startRecipeBtn).toBeInTheDocument();
    expect(startRecipeBtn).toBeEnabled();
  });
});
