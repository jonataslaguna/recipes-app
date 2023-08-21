import ContextRecipes from './ContextRecipes';

type ProviderRecipesProps = {
  children: React.ReactNode;
};

function ProviderRecipes({ children }: ProviderRecipesProps) {
  return (
    <ContextRecipes.Provider value={ {} }>
      {children}
    </ContextRecipes.Provider>
  );
}

export default ProviderRecipes;
