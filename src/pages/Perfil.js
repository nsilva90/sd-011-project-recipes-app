import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const headerProps = {
    title: 'Perfil',
    enableSearchButton: false,
    enableProfileButton: true,
  };

  const email = JSON.parse(localStorage.getItem('user'));
  console.log(email);

  return (
    <div>
      <Header props={ headerProps } />
      <h1 data-testid="profile-email">{email ? email.email : ''}</h1>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Perfil;
