import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import DrinkFavoriteButton from '../components/DrinkFavoriteButton';
import CheckboxDrink from '../components/CheckboxDrink';
import '../components/css/RecipeDetails.css';

function RecipeDrinkInProgress({ match, location }) {
  const [recipe, setRecipe] = useState('');

  const { params } = match;
  const { pathname } = location;
  const { id } = params;

  const pathURL = pathname.split('/in')[0];

  useEffect(() => {
    fetch(`${'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='}${id}`)
      .then((response) => response.json())
      .then((result) => setRecipe(result));
  }, [id]);

  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    if (recipe && recipe.drinks) {
      const recipeKeys = Object.keys(recipe.drinks[0]);

      const ingredientsKeys = [];
      const measureKeys = [];
      recipeKeys.forEach((key) => {
        if (key.includes('strIngredient')) ingredientsKeys.push(key);
        if (key.includes('strMeasure')) measureKeys.push(key);
      });

      const recipeIngredints = [];
      ingredientsKeys.forEach((ingredient) => {
        recipeIngredints.push(recipe.drinks[0][ingredient]);
      });

      const recipeMeasure = [];
      measureKeys.forEach((measure) => {
        recipeMeasure.push(recipe.drinks[0][measure]);
      });

      const filteredIngredints = recipeIngredints.filter((ingredient) => ingredient);
      setIngredients(filteredIngredints);

      const filteredMeasures = recipeMeasure.filter((measure) => measure);
      setMeasures(filteredMeasures);
    }
  }, [recipe]);

  const [hidden, setHidden] = useState(true);

  function renderDrinkDetails() {
    if (recipe.drinks) {
      return (
        <div className="supply-card">
          <img
            data-testid="recipe-photo"
            src={ recipe.drinks[0].strDrinkThumb }
            alt={ recipe.drinks[0].strDrink }
          />
          <h1 data-testid="recipe-title">{ recipe.drinks[0].strDrink }</h1>
          <button
            onClick={ () => {
              alert('Link copiado!');
              copy(`http://localhost:3000${pathURL}`);
              setHidden(false);
            } }
            type="button"
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          {!hidden && <div>Link copiado!</div>}
          <DrinkFavoriteButton recipe={ recipe.drinks[0] } />
          <h3 data-testid="recipe-category">
            {recipe.drinks[0].strAlcoholic}
          </h3>
          <h2>Ingredientes</h2>
          <CheckboxDrink
            ingredients={ ingredients }
            measures={ measures }
            pathname={ pathname }
            recipe={ recipe }
          />
          <h2>Instruções</h2>
          <p data-testid="instructions">
            {recipe.drinks[0].strInstructions}
          </p>
        </div>
      );
    }
  }

  return (
    <div>
      {!recipe ? <div>Loading...</div> : renderDrinkDetails()}
    </div>
  );
}

export default RecipeDrinkInProgress;

RecipeDrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
