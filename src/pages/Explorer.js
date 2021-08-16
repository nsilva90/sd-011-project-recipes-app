import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorer() {
  const headerProps = {
    title: 'Explorar',
    enableSearchButton: false,
    enableProfileButton: true,
  };
  return (
    <div>
      <Header props={ headerProps } />
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explorer;
