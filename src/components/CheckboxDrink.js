import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CheckboxDrink({ ingredients, measures, pathname, recipe }) {
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
  function dataAtualFormatada() {
    const data = new Date();
    const dia = data.getDate().toString();
    const diaF = (dia.length === 1) ? `0${dia}` : dia;
    const mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
    const mesF = (mes.length === 1) ? `0${mes}` : mes;
    const anoF = data.getFullYear();
    return `${diaF}/${mesF}/${anoF}`;
  }

  console.log(recipe);

  function saveDoneRecipe() {
    const doneRecipe = {
      id: recipe.drinks[0].idDrink,
      type: 'bebida',
      area: recipe.drinks[0].strArea,
      category: recipe.drinks[0].strCategory,
      alcoholicOrNot: recipe.drinks[0].strAlcoholic,
      name: recipe.drinks[0].strDrink,
      image: recipe.drinks[0].strDrinkThumb,
      doneDate: dataAtualFormatada(),
      tags: recipe.drinks[0].strTags
        ? [recipe.drinks[0].strTags] : [],
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

  function saveDrinkProgress(currentLocalStorage, ingredient, idRecipee) {
    const drinkSavedIngredients = currentLocalStorage.cocktails[idRecipee];

    if (!drinkSavedIngredients) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          ...currentLocalStorage,
          cocktails: {
            [idRecipee]: [ingredient],
          },
        }),
      );
    } else {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          ...currentLocalStorage,
          cocktails: {
            [idRecipee]: [...drinkSavedIngredients, ingredient],
          },
        }),
      );
    }
  }

  function saveProgress(ingredient) {
    const savedIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));

    saveDrinkProgress(savedIngredients, ingredient, idRecipe);
  }

  function handleCheckbox() {
    setAllCheckbox([...allCheckbox, true]);

    if (allCheckbox.length + 1 === ingredients.length) {
      setAllCheckboxMarkup(!allCheckboxMarkup);
    } else {
      setAllCheckboxMarkup(false);
    }
  }

  const activedIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));

  return (
    <div>
      {activedIngredients
      && ingredients.map((ingredient, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            type="checkbox"
            id={ ingredients[index] }
            onChange={ () => {
              handleCheckbox();
              saveProgress(ingredient);
            } }
            checked={ (
              activedIngredients.cocktails[idRecipe]
              && activedIngredients.cocktails[idRecipe].includes(ingredient)
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

export default CheckboxDrink;

CheckboxDrink.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
  pathname: PropTypes.string,
}.isRequired;
