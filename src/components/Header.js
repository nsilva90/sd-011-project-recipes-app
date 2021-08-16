import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './css/Header.css';
import SearchBar from './SearchBar';

function Header({ props: { title, enableSearchButton, enableProfileButton } }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div className="header-container">
      <header className="header">
        {enableProfileButton
          && (
            <Link to="/perfil">
              <button
                type="button"
                data-testid="profile-top-btn"
                id="profileIcon"
                src={ profileIcon }
              >
                <img src={ profileIcon } alt="profile" />
              </button>
            </Link>)}

        <h1 data-testid="page-title">{title}</h1>

        {enableSearchButton
          && (
            <button
              type="button"
              data-testid="search-top-btn"
              src={ searchIcon }
              onClick={ () => setShowSearchBar(!showSearchBar) }
            >
              <img src={ searchIcon } alt="Lens" />
            </button>)}
        {showSearchBar && (<SearchBar title={ title } />)}
      </header>
    </div>
  );
}

export default Header;

Header.propTypes = {
  props: PropTypes.shape({
    title: PropTypes.string,
    enableSearchButton: PropTypes.bool,
    enableProfileButton: PropTypes.bool,
  }).isRequired,
};
