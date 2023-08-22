import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do App', () => {
  it('Testes no componente login', async () => {
    const { user } = renderWithRouter(<App />);
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
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    const profileBtn = screen.getByRole('img', { name: /profile/i });
    const searchBtn = screen.getByRole('img', { name: /search/i });
    await user.click(searchBtn);
    const searchInput = screen.getByRole('textbox');
    await user.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();

    await user.click(profileBtn);
    expect(screen.getByTestId('page-title'));
  });
});
