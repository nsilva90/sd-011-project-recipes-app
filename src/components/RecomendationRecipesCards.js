import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/RecomendationRecipesCards.css';

function RecomendationRecipesCards({ identifier }) {
  const [recomendations, setRecomendations] = useState({ loading: ['true'] });
  const [type, setType] = useState({
    id: '',
    image: '',
    title: '',
    url: '',
  });

  useEffect(() => {
    if (identifier === 'bebidas') {
      setType({
        id: 'idMeal',
        image: 'strMealThumb',
        title: 'strMeal',
        url: 'comidas',
      });
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((result) => setRecomendations(result));
    }
    if (identifier === 'comidas') {
      setType({
        id: 'idDrink',
        image: 'strDrinkThumb',
        title: 'strDrink',
        url: 'bebidas',
      });
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((result) => setRecomendations(result));
    }
  }, [identifier]);

  const recipeIdentity = Object.keys(recomendations)[0];

  const maxCardsOnPage = 6;
  const recomendationsLimited = recomendations[recipeIdentity].slice(0, maxCardsOnPage);

  return (
    <div className="recomendations">
      { recomendationsLimited.map((supply, index) => (
        <Link
          key={ index }
          to={ `/${type.url}/${supply[type.id]}` }
        >
          <div
            data-testid={ `${index}-recomendation-card` }
            className="recomendations-card"
          >
            <img
              className="supply-card"
              src={ supply[type.image] }
              alt={ supply[type.title] }
              data-testid={ `${index}-card-img` }
            />
            <div
              data-testid={ `${index}-card-name` }
            >
              <h1 data-testid={ `${index}-recomendation-title` }>{supply[type.title]}</h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RecomendationRecipesCards;

RecomendationRecipesCards.propTypes = {
  identifier: PropTypes.string.isRequired,
};
