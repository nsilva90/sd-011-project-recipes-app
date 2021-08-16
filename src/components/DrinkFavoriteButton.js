import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinkFavoriteButton({ recipe }) {
  const [btnIsFavorited, setBtnIsFavorited] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      const storageRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const verify = storageRecipes.some((recipee) => (
        recipee.id === recipe.idDrink
      ));
      if (verify) {
        setBtnIsFavorited(true);
      } else {
        setBtnIsFavorited(false);
      }
    }
  }, [recipe]);

  function setFavoriteRecipeOnLocalStorage() {
    const drinkObj = {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    const favoriteSupply = [];

    if (!btnIsFavorited) {
      const recipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      favoriteSupply.push(drinkObj);

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
        return recipee.id !== recipe.idDrink;
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

export default DrinkFavoriteButton;

DrinkFavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
