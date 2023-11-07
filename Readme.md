# Recipes App

Este é um aplicativo de receitas destinado a celulares. 
O aplicativo permite aos usuários explorar e acompanhar receitas de comidas e drinks de maneira fácil e conveniente. O projeto foi construído utilizando React, TypeScript, Context API e React Hooks, e integra duas APIs externas, TheMealDB API e TheCockTailDB API.

## Time de Desenvolvimento

Este aplicativo foi desenvolvido por uma equipe de cinco pessoas, usando metodologias ágeis e Scrum para organizar os requisitos e o desenvolvimento. Conheça os membros da equipe: 

- Jonatas Laguna
- <a href="https://github.com/brunamohn">Bruna Mohn</a> 
- <a href="https://github.com/anacarolinaraca">Ana Carolina</a> 
- <a href="https://github.com/rodrigobianek">Rodrigo Bianek</a> 
- <a href="https://github.com/alex-vido">Alex Barbosa</a> 

## Como utilizar

Se não quiser fazer a instalação utilize o app através desse <a href="https://recipes-app-jonatas-laguna.vercel.app">link</a>, caso contrário basta seguir os passos abaixo para a [instalação](#instalação).

<strong> Obs</strong>: O app foi desenvolvido para o uso apenas em celulares. Caso queira utilizar no desktop, baixe a extenção <a href="https://chrome.google.com/webstore/detail/mobile-simulator-responsi/ckejmhbmlajgoklhgbapkiccekfoccmk?hl=pt-br">Mobile simulator</a> para ter uma experiência melhor.

## Funcionalidades Principais

- Página de Login: Os usuários podem acessar o aplicativo através de uma página de login. Para efetuar o login bastar digitar um email válido e uma senha com no mínimo 7 caracteres.

![Texto alternativo](/public/readme/login.png)

- Página Meals: Apresenta uma coleção de receitas de comidas, que os usuários podem filtrar por categorias.

![Texto alternativo](/public/readme/meals.png)

- Página Drinks: Apresenta uma coleção de receitas de drinks, que os usuários também podem filtrar por categorias.

![Texto alternativo](/public/readme/drinks.png)

- É possível também realizar uma busca mais específica por ingrediente, nome e primeira letra, tocando no icone de pesquisa no canto superior direito.

![Texto alternativo](/public/readme/search.png)

- Página de Detalhes: Ao tocar em uma receita específica, será direcionado para uma página detalhada com informações sobre os ingredientes, instruções, vídeo explicativo e receitas recomendadas, além de oferecer a capacidade de salvar a receita como favorita e compartilhar.

![Texto alternativo](/public/readme/details.png)

- Página Recipes in Progress: Fornece uma lista de ingredientes para que os usuários possam marcar conforme avançam na receita.

![Texto alternativo](/public/readme/inProgress.png)

- Página Done Recipes: Apresenta todas as receitas que foram finalizadas, permitindo aos usuários filtrar as receitas por tipo (drinks ou meals).

![Texto alternativo](/public/readme/doneRecipes.png)

- Página de Perfil: Permite aos usuários acessar as receitas já feitas, as favoritas e realizar logout.

![Texto alternativo](/public/readme/profile.png)

## Instalação

Certifique-se de ter o Node.js e o npm instalados antes de prosseguir.

1. Após realizar o clone do projeto, navegue até o diretório e instale as dependências com o comando:

       npm install

2. Inicie o servidor de desenvolvimento com o comando:

       npm run dev

Após isso a aplicação abrirá em seu navegador padrão.

## Contribuição

Este projeto está em andamento e aberto para contribuições. Se você deseja contribuir, siga estas etapas:

1. Faça um fork do projeto
2. Crie uma nova branch ( `git checkout -b feature/sua-feature`)
3. Faça commit das alterações ( `git commit -m 'Adicione sua feature'`)
4. Faça push para a branch ( `git push origin feature/sua-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob os termos da [MIT License](https://opensource.org/licenses/MIT).

## Contato

Para questões ou sugestões relacionadas a este projeto, sinta-se à vontade para entrar em contato via e-mail: [jonataslaguna.js@email.com](mailto:jonataslaguna.js@email.com)
