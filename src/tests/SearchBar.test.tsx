import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import ProviderRecipes from '../context/ProviderRecipes';
import { ingredientsMealsMock } from './mocks/ingredientsMealsMock';
import { filterByFirstLetterMock } from './mocks/filterByFirstLetterMock';
import { ingredientsDrinksMock } from './mocks/ingredientsDrinksMock';
import filterByNameDrinks from './mocks/filterByNameDrinks';
import { detailsMock } from './mocks/detailsMock';
import { detailsMockDrinks } from './mocks/detailsMockDrinks';

const dataTestIdBtnSearch = 'exec-search-btn';
const radioNameDataTestingId = 'name-search-radio';
describe('Componente SearchBar na pagina /meals', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ingredientsMealsMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Testa a renderização e funcionamento do componente SearchBar na pagina /meals', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );
    const searchBtn = screen.getByRole('img', { name: /search/i });
    const profileBtn = screen.getByRole('img', { name: /profile/i });
    expect(screen.getByRole('heading', { name: /meals/i }));
    await user.click(searchBtn);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    expect(screen.getByRole('radio', { name: /name/i })).toBeInTheDocument();
    const inputText = screen.getByRole('textbox');
    const btnSearch = screen.getByTestId(dataTestIdBtnSearch);
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/first letter/i)).toBeInTheDocument();
    await user.click(radioIngredient);
    await user.type(inputText, 'milk');
    await user.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(screen.getAllByRole('img')).toHaveLength(48);
    });
    await user.click(profileBtn);
    expect(window.location.pathname).toBe('/profile');
  });
});

describe('Input First Letter na página /meals', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => filterByFirstLetterMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Testa a filtragem do input First Letter', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );
    const searchBtn = screen.getByRole('img', { name: /search/i });
    await user.click(searchBtn);
    const radioName = screen.getByText(/first letter/i);
    const inputText = screen.getByRole('textbox');
    await user.click(radioName);
    await user.type(inputText, 'a');
    await user.click(screen.getByTestId(dataTestIdBtnSearch));
    expect(screen.getAllByRole('img')).toHaveLength(11);
  });
});

describe('Componente SearchBar na pagina /drinks', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ingredientsDrinksMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Testa a renderização e funcionamento do componente SearchBar na pagina /drinks', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/drinks' },
    );
    const searchBtn = screen.getByRole('img', { name: /search/i });
    const profileBtn = screen.getByRole('img', { name: /profile/i });
    expect(screen.getByRole('heading', { name: /drinks/i })).toBeInTheDocument();
    await user.click(searchBtn);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    expect(screen.getByRole('radio', { name: /name/i })).toBeInTheDocument();
    const inputText = screen.getByRole('textbox');
    const btnSearch = screen.getByTestId(dataTestIdBtnSearch);
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/first letter/i)).toBeInTheDocument();
    await user.click(radioIngredient);
    await user.type(inputText, 'milk');
    await user.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(screen.getAllByRole('img')).toHaveLength(19);
    });
    await user.click(profileBtn);
    expect(window.location.pathname).toBe('/profile');
  });
  it('Testes do input radio First letter', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/drinks' },
    );
    const searchBtn = screen.getByRole('img', { name: /search/i });
    await user.click(searchBtn);
    const radioName = screen.getByText(/first letter/i);
    const inputText = screen.getByRole('textbox');
    await user.click(radioName);
    await user.type(inputText, 'a');
    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(19);
    });
  });
});

describe('Testes de filtro na page drinks', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => filterByNameDrinks,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Teste no filtro name', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/drinks' },
    );
    const searchBtn = screen.getByRole('img', { name: /search/i });
    await user.click(searchBtn);
    const radioName = screen.getByTestId(radioNameDataTestingId);
    const inputText = screen.getByRole('textbox');
    await user.click(radioName);
    await user.type(inputText, 'banana');
    await user.click(screen.getByTestId(dataTestIdBtnSearch));
    expect(screen.getAllByRole('img')).toHaveLength(14);
  });
});

describe('Componente SearchBar na pagina /meals', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => filterByNameDrinks,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Testa a search com input vazio', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );

    const searchBtn = screen.getByRole('img', { name: /search/i });
    fireEvent.click(searchBtn);
    const btnSearch = screen.getByTestId('exec-search-btn');
    await user.click(btnSearch);

    expect(global.fetch).toBeCalled();
  });

  it('Testa a seleção de radio buttons', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );

    const searchBtn = screen.getByRole('img', { name: /search/i });
    fireEvent.click(searchBtn);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId(radioNameDataTestingId);
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');

    user.click(radioIngredient);
    expect(radioName).not.toBeChecked();
    expect(radioFirstLetter).not.toBeChecked();

    user.click(radioName);
    expect(radioIngredient).not.toBeChecked();
    expect(radioFirstLetter).not.toBeChecked();

    user.click(radioFirstLetter);
    expect(radioIngredient).not.toBeChecked();
    expect(radioName).not.toBeChecked();
  });
});

describe('Caso encontre apenas uma receita na pagina meals', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Redireciona para a pagina details caso encontre apenas uma receita', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/meals' },
    );
    const searchBtnImg = screen.getByRole('img', { name: /search/i });
    await user.click(searchBtnImg);
    const radioName = screen.getByTestId('name-search-radio');
    await user.click(radioName);
    const inputText = screen.getByRole('textbox');
    await user.type(inputText, 'Corba');
    await user.click(screen.getByTestId(dataTestIdBtnSearch));
    expect(window.location.pathname).toBe('/meals/52977');
  });
});

describe('Caso encontre apenas uma receita na pagina drinks', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => detailsMockDrinks,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Redireciona para a pagina details caso encontre apenas uma receita', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <App />
      </ProviderRecipes>,
      { route: '/drinks' },
    );
    const searchBtnImg = screen.getByRole('img', { name: /search/i });
    await user.click(searchBtnImg);
    const radioName = screen.getByTestId(radioNameDataTestingId);
    await user.click(radioName);
    const inputText = screen.getByRole('textbox');
    await user.type(inputText, 'Aquamarine');
    await user.click(screen.getByTestId(dataTestIdBtnSearch));
    expect(window.location.pathname).toBe('/drinks/178319');
  });
});
