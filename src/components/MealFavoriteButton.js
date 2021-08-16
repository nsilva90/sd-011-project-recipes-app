import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function MealFavoriteButton({ recipe }) {
  const [btnIsFavorited, setBtnIsFavorited] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      const storageRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const verify = storageRecipes.some((recipee) => (
        recipee.id === recipe.idMeal
      ));
      if (verify) {
        setBtnIsFavorited(true);
      } else {
        setBtnIsFavorited(false);
      }
    }
  }, [recipe]);

  function setFavoriteRecipeOnLocalStorage() {
    const mealObj = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };

    const favoriteSupply = [];

    if (!btnIsFavorited) {
      const recipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      favoriteSupply.push(mealObj);

      if (recipesStorage) {
        recipesStorage.forEach((element) => {
          favoriteSupply.push(element);
        });
      }

      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteSupply));
    } else {
      const recipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const recipesFiltered = recipesStorage.filter((recipee) => {
        console.log(recipee);
        return recipee.id !== recipe.idMeal;
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipesFiltered));
    }
  }

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      src={ btnIsFavorited ? blackHeartIcon : whiteHeartIcon }
      onClick={ () => {
        setBtnIsFavorited(!btnIsFavorited);
        setFavoriteRecipeOnLocalStorage();
      } }
    >
      <img
        src={ btnIsFavorited ? blackHeartIcon : whiteHeartIcon }
        alt="whiteHeartIcon"
      />
    </button>
  );
}

export default MealFavoriteButton;

MealFavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
