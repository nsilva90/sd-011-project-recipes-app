import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context/GlobalContext';
import './css/ButtonsCategories.css';

function ButtonsCategories({ categoryName }) {
  const { setCatalog } = useContext(GlobalContext);

  const [categories, setCategories] = useState({ loading: ['true'] });
  const [URLCategoryToSearch, setURLCategoryToSearch] = useState('');
  const [filterActive, setFilterActive] = useState(true);

  useEffect(() => {
    function fetchAPI() {
      if (categoryName === 'Comidas') {
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
          .then((response) => response.json())
          .then((result) => setCategories(result));
      }
      if (categoryName === 'Bebidas') {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
          .then((response) => response.json())
          .then((result) => setCategories(result));
      }
    }
    fetchAPI();
  }, [categoryName]);

  useEffect(() => {
    if (URLCategoryToSearch && filterActive) {
      if (categoryName === 'Comidas') {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${URLCategoryToSearch}`)
          .then((response) => response.json())
          .then((result) => setCatalog(result));
      }
      if (categoryName === 'Bebidas') {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${URLCategoryToSearch}`)
          .then((response) => response.json())
          .then((result) => setCatalog(result));
      }
    } else {
      if (categoryName === 'Comidas') {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((response) => response.json())
          .then((result) => setCatalog(result));
      }
      if (categoryName === 'Bebidas') {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
          .then((response) => response.json())
          .then((result) => setCatalog(result));
      }
    }
  }, [URLCategoryToSearch, setCatalog, filterActive, categoryName]);

  function resetFetchAPI() {
    console.log('teste');
    if (categoryName === 'Comidas') {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((result) => setCatalog(result));
    }
    if (categoryName === 'Bebidas') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((result) => setCatalog(result));
    }
  }

  const supplyIdentity = Object.keys(categories)[0];

  const maxCardsOnPage = 5;
  const categoriesLimited = categories[supplyIdentity].slice(0, maxCardsOnPage);

  return (
    <div className="btn-categories">
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => resetFetchAPI() }
      >
        All
      </button>
      {categoriesLimited.map((category, index) => (
        <button
          data-testid={ `${category.strCategory}-category-filter` }
          type="button"
          key={ index }
          name={ category.strCategory }
          onClick={ ({ target }) => {
            if (URLCategoryToSearch === category.strCategory) {
              setFilterActive(!filterActive);
            }
            if (!filterActive) {
              setFilterActive(true);
            }
            setURLCategoryToSearch(target.name);
          } }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default ButtonsCategories;

ButtonsCategories.propTypes = {
  categoryName: PropTypes.string.isRequired,
};
