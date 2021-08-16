import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import './css/Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/bebidas">
        <button type="button" src={ drinkIcon } data-testid="drinks-bottom-btn">
          <img src={ drinkIcon } alt="Drink" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button" src={ exploreIcon } data-testid="explore-bottom-btn">
          <img src={ exploreIcon } alt="Explorar" />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
          src={ mealIcon }
          data-testid="food-bottom-btn"
        >
          <img src={ mealIcon } alt="Comidas" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
