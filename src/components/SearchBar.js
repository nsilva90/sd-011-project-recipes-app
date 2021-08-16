import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import './css/SearchBar.css';

function SearchBar({ title }) {
  const [inputIngredient, setinputIngredient] = useState(false);
  const [inputName, setinputName] = useState(false);
  const [inputFirstLetter, setinputFirstLetter] = useState(false);
  const [fetchUrl, setfetchUrl] = useState('');
  const [search, setSearch] = useState('');

  const { setCatalog } = useContext(GlobalContext);
  const history = useHistory();

  function RedirectDetails(foods) {
    if (foods.drinks) {
      if (foods.drinks.length === 1) {
        const { idDrink } = foods.drinks[0];
        history.push({
          pathname: `/bebidas/${idDrink}`,
        });
      }
      const TRUE = true;
      if (TRUE) return null;
    }
    if (foods.meals) {
      if (foods.meals.length === 1) {
        const { idMeal } = foods.meals[0];
        history.push({
          pathname: `/comidas/${idMeal}`,
        });
      }
      const TRUE = true;
      if (TRUE) return null;
    }
  }

  async function fetchAPI() {
    const response = await fetch(fetchUrl);
    const result = await response.json();
    console.log(result);
    if (result.meals || result.drinks) {
      setCatalog(result);
      RedirectDetails(result);
    } else {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  function searchFood() {
    if (search.length > 1 && inputFirstLetter) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    fetchAPI();
  }

  useEffect(() => {
    if (title === 'Comidas') {
      const defaultUrl = 'https://www.themealdb.com/api/json/v1/1/';
      if (inputIngredient) {
        setfetchUrl(`${defaultUrl}filter.php?i=${search}`);
      } if (inputName) {
        setfetchUrl(`${defaultUrl}search.php?s=${search}`);
      }
      if (inputFirstLetter) {
        setfetchUrl(`${defaultUrl}search.php?f=${search}`);
      }
    }
    if (title === 'Bebidas') {
      const defaultUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
      if (inputIngredient) {
        setfetchUrl(`${defaultUrl}filter.php?i=${search}`);
      } if (inputName) {
        setfetchUrl(`${defaultUrl}search.php?s=${search}`);
      }
      if (inputFirstLetter) {
        setfetchUrl(`${defaultUrl}search.php?f=${search}`);
      }
    }
  }, [search, inputFirstLetter, inputName, inputIngredient, title]);
  return (
    <div className="search-bar">
      <input
        onChange={ (e) => setSearch(e.target.value) }
        data-testid="search-input"
        className="input-search"
        type="search"
        placeholder="Pesquisar..."
      />
      <div className="search-prop">
        <label htmlFor="ingredient">
          <input
            onChange={ () => {
              setinputFirstLetter(false);
              setinputName(false);
              setinputIngredient(!inputIngredient);
            } }
            name="inputRadio"
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            onChange={ () => {
              setinputIngredient(false);
              setinputFirstLetter(false);
              setinputName(!inputName);
            } }
            name="inputRadio"
            type="radio"
            id="name"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            onChange={ () => {
              setinputName(false);
              setinputIngredient(false);
              setinputFirstLetter(!inputFirstLetter);
            } }
            name="inputRadio"
            type="radio"
            id="first-letter"
            data-testid="first-letter-search-radio"
          />
          Primeira Letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchFood }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string,
  history: PropTypes.node,
}.isRequired;

export default SearchBar;
