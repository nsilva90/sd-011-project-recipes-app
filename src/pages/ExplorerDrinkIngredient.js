import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorerDrinkIngredient() {
  const headerProps = {
    title: 'Explorar Ingredientes',
    enableSearchButton: false,
    enableProfileButton: true,
  };

  const [listIngredients, setListIngredients] = useState('');

  const maxCardsOnPage = 12;
  const ingredientsLimited = listIngredients.slice(0, maxCardsOnPage);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((response) => response.json())
      .then((result) => setListIngredients(result.drinks));
  }, []);

  const imageIngredientUrl = 'https://www.thecocktaildb.com/images/ingredients/';

  return (
    <div>
      <Header props={ headerProps } />
      {ingredientsLimited && ingredientsLimited.map((listIngredient, index) => (
        <Link
          key={ index }
          to={ `/bebidas/ingredientes/${listIngredient.strIngredient1}` }
        >
          <div data-testid={ `${index}-ingredient-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ `${imageIngredientUrl}${listIngredient.strIngredient1}-Small.png` }
              alt={ listIngredient.strIngredient1 }
            />
            <h1 data-testid={ `${index}-card-name` }>{listIngredient.strIngredient1}</h1>
          </div>
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default ExplorerDrinkIngredient;
