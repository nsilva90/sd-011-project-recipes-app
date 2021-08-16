import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardCatalog from '../components/CardCatalog';
import GlobalContext from '../context/GlobalContext';
import ButtonsCategories from '../components/ButtonsCategories';

function Drinks({ match: { params } }) {
  const headerProps = {
    title: 'Bebidas',
    enableSearchButton: true,
    enableProfileButton: true,
  };

  const { catalog, setCatalog } = useContext(GlobalContext);

  const searchURL = !params.ingredient ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${params.ingredient}`;

  useEffect(() => {
    function fetchAPI() {
      fetch(searchURL)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setCatalog(result);
        });
    }
    fetchAPI();
  }, [setCatalog, searchURL]);

  return (
    <div>
      <Header props={ headerProps } />
      { !searchURL.includes('filter')
      && <ButtonsCategories categoryName={ headerProps.title } /> }
      {!catalog ? <div>Loading...</div> : <CardCatalog />}
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Drinks;
