import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorerDrink() {
  const headerProps = {
    title: 'Explorar Bebidas',
    enableSearchButton: false,
    enableProfileButton: true,
  };

  const [randomIDRecipe, setRandomIDRecipe] = useState('');

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((result) => setRandomIDRecipe(result.drinks[0].idDrink));
  }, []);

  return (
    <div>
      <Header props={ headerProps } />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${randomIDRecipe}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExplorerDrink;
