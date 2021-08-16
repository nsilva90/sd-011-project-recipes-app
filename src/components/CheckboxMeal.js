import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CheckboxMeal({ ingredients, measures, pathname, recipe }) {
  const [allCheckboxMarkup, setAllCheckboxMarkup] = useState(false);
  const [allCheckbox, setAllCheckbox] = useState([]);

  const pathnameSplit = pathname.split('/');
  const idRecipe = pathnameSplit[2];

  useEffect(() => {
    const inProgressRecipesStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );

    if (!inProgressRecipesStorage) {
      localStorage.setItem(
        'inProgressRecipes', JSON.stringify({
          cocktails: '',
          meals: '',
        }),
      );
    }
  }, []);

  function saveMealProgress(ingredient, idRecipee) {
    const currentLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealSavedIngredients = currentLocalStorage.meals[idRecipee];

    if (!mealSavedIngredients) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          ...currentLocalStorage,
          meals: {
            [idRecipee]: [ingredient],
          },
        }),
      );
    } else {
      // const currentInProgressRecipesMeals = {
      //   52928: ["One Piece", "Cadabra", "Os quebra taça", "Fíu"],
      // };

      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          ...currentLocalStorage,
          meals: {
            ...currentLocalStorage,
            [idRecipee]: [...mealSavedIngredients, ingredient],
          },
        }),
      );
    }
  }

  function saveProgress(ingredient) {
    saveMealProgress(ingredient, idRecipe);
  }

  function handleCheckbox() {
    setAllCheckbox([...allCheckbox, true]);

    if (allCheckbox.length + 1 === ingredients.length) {
      setAllCheckboxMarkup(!allCheckboxMarkup);
    } else {
      setAllCheckboxMarkup(false);
    }
  }

  // Ref. https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript
  function dataAtualFormatada() {
    const data = new Date();
    const dia = data.getDate().toString();
    const diaF = (dia.length === 1) ? `0${dia}` : dia;
    const mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
    const mesF = (mes.length === 1) ? `0${mes}` : mes;
    const anoF = data.getFullYear();
    return `${diaF}/${mesF}/${anoF}`;
  }

  console.log(dataAtualFormatada());

  function saveDoneRecipe() {
    const doneRecipe = {
      id: recipe.meals[0].idMeal,
      type: 'comida',
      area: recipe.meals[0].strArea,
      category: recipe.meals[0].strCategory,
      alcoholicOrNot: '',
      name: recipe.meals[0].strMeal,
      image: recipe.meals[0].strMealThumb,
      doneDate: dataAtualFormatada(),
      tags: recipe.meals[0].strTags
        ? [recipe.meals[0].strTags] : [],
    };
    const checkStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!checkStorage) {
      const storageDoneRecipe = [doneRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(storageDoneRecipe));
    } else {
      const storageDoneRecipe = [...checkStorage, doneRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(storageDoneRecipe));
    }
  }

  const activedIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));

  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            type="checkbox"
            id={ ingredients[index] }
            onChange={ () => {
              handleCheckbox();
              saveProgress(ingredient);
            } }
            checked={ (
              activedIngredients.meals[idRecipe]
              && activedIngredients.meals[idRecipe].includes(ingredient)
            ) }
          />
          <label htmlFor={ ingredients[index] }>
            {ingredient}
            {' '}
            <strong>{measures[index]}</strong>
          </label>
        </div>
      ))}
      <Link to="/receitas-feitas">
        <button
          disabled={ !allCheckboxMarkup }
          className="start-recipe"
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ saveDoneRecipe }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default CheckboxMeal;

CheckboxMeal.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
  pathname: PropTypes.string,
}.isRequired;
