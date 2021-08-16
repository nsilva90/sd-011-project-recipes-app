import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecomendationRecipesCards from '../components/RecomendationRecipesCards';
import shareIcon from '../images/shareIcon.svg';
import MealFavoriteButton from '../components/MealFavoriteButton';
import '../components/css/RecipeDetails.css';

function RecipeMealDetails({ match, location }) {
  const [recipe, setRecipe] = useState('');

  const { params } = match;
  const { pathname } = location;
  const { id } = params;

  useEffect(() => {
    fetch(`${'https://www.themealdb.com/api/json/v1/1/lookup.php?i='}${id}`)
      .then((response) => response.json())
      .then((result) => setRecipe(result));
  }, [id]);

  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    if (recipe && recipe.meals) {
      const recipeKeys = Object.keys(recipe.meals[0]);

      const ingredientsKeys = [];
      const measureKeys = [];
      recipeKeys.forEach((key) => {
        if (key.includes('strIngredient')) ingredientsKeys.push(key);
        if (key.includes('strMeasure')) measureKeys.push(key);
      });

      const recipeIngredints = [];
      ingredientsKeys.forEach((ingredient) => {
        recipeIngredints.push(recipe.meals[0][ingredient]);
      });

      const recipeMeasure = [];
      measureKeys.forEach((measure) => {
        recipeMeasure.push(recipe.meals[0][measure]);
      });

      const filteredIngredints = recipeIngredints.filter((ingredient) => ingredient);
      setIngredients(filteredIngredints);

      const filteredMeasures = recipeMeasure.filter((measure) => measure);
      setMeasures(filteredMeasures);
    }
  }, [recipe]);

  function getCorrectYoutubeURL(urlLink) {
    if (urlLink) {
      const youtubeVideoId = urlLink.split('?v=', 2)[1];
      const IFrameYtLink = `https://www.youtube.com/embed/${youtubeVideoId}`;

      return IFrameYtLink;
    }
  }

  const [hidden, setHidden] = useState(true);

  function renderMealDetails() {
    if (recipe.meals) {
      return (
        <div className="supply-card">
          <img
            data-testid="recipe-photo"
            src={ recipe.meals[0].strMealThumb }
            alt={ recipe.meals[0].strMeal }
          />
          <h1 data-testid="recipe-title">{ recipe.meals[0].strMeal }</h1>
          <button
            onClick={ () => {
              alert('Link copiado!');
              copy(`http://localhost:3000${pathname}`);
              setHidden(false);
            } }
            type="button"
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          {!hidden && <div>Link copiado!</div>}
          <MealFavoriteButton recipe={ recipe.meals[0] } />
          <h3 data-testid="recipe-category">
            {recipe.meals[0].strCategory}
          </h3>
          <h2>Ingredientes</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ingredient}
                {' '}
                <strong>{measures[index]}</strong>
              </li>
            ))}
          </ul>
          <h2>Intruções</h2>
          <p data-testid="instructions">
            {recipe.meals[0].strInstructions}
          </p>
          <iframe
            data-testid="video"
            title={ recipe.meals[0].strMeal }
            src={ getCorrectYoutubeURL(recipe.meals[0].strYoutube) }
          />
          <h2>Recomendações</h2>
          <div>
            <RecomendationRecipesCards identifier="comidas" />
          </div>
          <Link to={ `${pathname}/in-progress` }>
            <button
              className="start-recipe"
              type="button"
              data-testid="start-recipe-btn"
            >
              Continuar Receita
            </button>
          </Link>
        </div>
      );
    }
  }

  return (
    <div>
      {recipe && renderMealDetails()}
    </div>
  );
}

export default RecipeMealDetails;

RecipeMealDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
