import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes do App', () => {
  it('Testes no componente login', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const input = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await userEvent.type(input, 'teste');
    await userEvent.type(password, '123');
    expect(button).toBeDisabled();

    userEvent.clear(input);
    userEvent.clear(password);

    await userEvent.type(input, 'email@teste.com');
    await userEvent.type(password, '1234567');
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    expect(window.location.pathname).toBe('/meals');
  });
  it('Testes no componente Footer', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const input = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button');

    await userEvent.type(input, 'email@teste.com');
    await userEvent.type(password, '1234567');
    await userEvent.click(button);

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');

    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });
});
