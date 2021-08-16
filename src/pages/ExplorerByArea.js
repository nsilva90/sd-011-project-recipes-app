import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExplorerByArea() {
  const headerProps = {
    title: 'Explorar Origem',
    enableSearchButton: true,
    enableProfileButton: true,
  };
  const [areas, setAreas] = useState('');
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json())
      .then((results) => setAreas(results.meals));
  }, []);

  const [selectedArea, setSelectedArea] = useState('');
  const [areaCatalog, setAreaCatalog] = useState('');

  const searchURL = !selectedArea ? 'https://www.themealdb.com/api/json/v1/1/search.php?s=' : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
  useEffect(() => {
    fetch(searchURL)
      .then((response) => response.json())
      .then((results) => setAreaCatalog(results.meals));
  }, [selectedArea, searchURL]);

  const maxCardsOnPage = 12;
  const catalogLimited = areaCatalog.length > 1 && areaCatalog.slice(0, maxCardsOnPage);

  function renderMealsCards() {
    return catalogLimited.map((food, index) => (
      <Link
        key={ index }
        to={ `/comidas/${food.idMeal}` }
      >
        <div data-testid={ `${index}-recipe-card` } className="supply-card">
          <div data-testid={ `${index}-card-name` }>
            <h1>{food.strMeal}</h1>
          </div>
          <img
            className="supply-img"
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      </Link>
    ));
  }

  return (
    <div>
      <Header props={ headerProps } />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target: { value } }) => setSelectedArea(value) }
      >
        <option data-testid="All-option" value="">All</option>
        {areas && areas.map((area, index) => (
          <option
            data-testid={ `${area.strArea}-option` }
            key={ index }
          >
            {area.strArea}
          </option>)) }
      </select>
      { areaCatalog && renderMealsCards() }
      <Footer />
    </div>
  );
}
