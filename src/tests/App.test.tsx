import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes do App', () => {
  it('Testa o componente login', async () => {
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

    await userEvent.type(input, 'email@teste.com');
    await userEvent.type(password, '123456');
    userEvent.click(button);
  });
});
