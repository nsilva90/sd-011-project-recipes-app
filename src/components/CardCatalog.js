import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import './css/CardCatalog.css';

function CardCatalog() {
  const { catalog, setCatalog } = useContext(GlobalContext);

  const supplyIdentity = Object.keys(catalog)[0];

  const maxCardsOnPage = 12;
  const catalogLimited = catalog[supplyIdentity].slice(0, maxCardsOnPage);

  function renderMealsCards() {
    return catalogLimited.map((food, index) => (
      <Link
        key={ index }
        to={ `/comidas/${food.idMeal}` }
      >
        <div data-testid={ `${index}-recipe-card` } className="supply-card">
          <div data-testid={ `${index}-card-name` }>
            <h1>{food.strMeal}</h1>
          </div>
          <img
            className="supply-img"
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      </Link>
    ));
  }

  function renderDrinksCards() {
    return catalogLimited.map((drink, index) => (
      <Link
        key={ index }
        to={ `/bebidas/${drink.idDrink}` }
      >
        <div data-testid={ `${index}-recipe-card` } className="supply-card">
          <div
            data-testid={ `${index}-card-name` }
          >
            <h1>{drink.strDrink}</h1>
          </div>
          <img
            className="supply-img"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${index}-card-img` }
          />
        </div>
      </Link>
    ));
  }

  useEffect(() => () => setCatalog(''), [setCatalog]);

  return (
    <div>
      {supplyIdentity === 'meals' ? renderMealsCards() : renderDrinksCards()}
    </div>
  );
}

export default CardCatalog;
