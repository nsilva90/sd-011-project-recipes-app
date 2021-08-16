import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

// alcoholicOrNot: ""
// area: "Turkish"
// category: "Side"
// id: "52977"
// image: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
// name: "Corba"
// type: "comida"

function FavoriteRecipes() {
  const headerProps = {
    title: 'Receitas Favoritas',
    enableSearchButton: false,
    enableProfileButton: true,
  };

  const [hidden, setHidden] = useState(false);

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  function copyButton(doneRecipe) {
    alert('Link copiado!');
    copy(`http://localhost:3000/${doneRecipe.type}s/${doneRecipe.id}`);
    setHidden(true);
  }

  const [forceRefreshPage, setForceRefreshPage] = useState(false);

  function removeFavoriteRecipeOnLocalStorage(localRecipe) {
    const recipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipesFiltered = recipesStorage.filter((recipee) => (
      !recipee.id.includes(localRecipe.id)
    ));
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipesFiltered));

    setForceRefreshPage(!forceRefreshPage);
  }

  function renderMealRecipe(favoriteRecipe, index) {
    return (
      <div className="supply-card" key={ index }>
        <Link to={ `/${favoriteRecipe.type}s/${favoriteRecipe.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            alt={ favoriteRecipe.name }
            src={ favoriteRecipe.image }
          />
          <p data-testid={ `${index}-horizontal-name` }>{favoriteRecipe.name}</p>
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {favoriteRecipe.area }
          {' '}
          -
          {' '}
          { favoriteRecipe.category}
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>{favoriteRecipe.doneDate}</p>
        <button
          onClick={ () => copyButton(favoriteRecipe) }
          src={ shareIcon }
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        {hidden && <p>Link copiado!</p>}
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          onClick={ () => {
            removeFavoriteRecipeOnLocalStorage(favoriteRecipe);
          } }
        >
          <img
            src={ blackHeartIcon }
            alt="whiteHeartIcon"
          />
        </button>
      </div>
    );
  }

  function renderDrinkRecipe(favoriteRecipe, index) {
    console.log(index);
    return (
      <div className="supply-card" key={ index }>
        <Link to={ `/${favoriteRecipe.type}s/${favoriteRecipe.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            alt={ favoriteRecipe.name }
            src={ favoriteRecipe.image }
          />
          <p data-testid={ `${index}-horizontal-name` }>{favoriteRecipe.name}</p>
        </Link>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {favoriteRecipe.alcoholicOrNot}
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>{favoriteRecipe.doneDate}</p>
        <button
          src={ shareIcon }
          onClick={ () => copyButton(favoriteRecipe) }
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        {hidden && <p>Link copiado!</p>}
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          onClick={ () => {
            removeFavoriteRecipeOnLocalStorage(favoriteRecipe);
          } }
        >
          <img
            src={ blackHeartIcon }
            alt="whiteHeartIcon"
          />
        </button>
      </div>
    );
  }

  const [filters, setFilters] = useState({
    Food: true,
    Drinks: true,
  });

  const MINUS_ONE = -1;
  let index = MINUS_ONE;

  return (
    <div>
      <Header props={ headerProps } />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilters({ Food: true, Drinks: true }) }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setFilters({ Food: true, Drinks: false }) }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilters({ Food: false, Drinks: true }) }
      >
        Drinks
      </button>
      { favoriteRecipes && favoriteRecipes.map((recipe) => {
        if (recipe.type === 'comida' && filters.Food) {
          index += 1;
          return renderMealRecipe(recipe, index);
        }
        if (recipe.type === 'bebida' && filters.Drinks) {
          index += 1;
          return renderDrinkRecipe(recipe, index);
        }
        return null;
      })}
    </div>
  );
}

export default FavoriteRecipes;
