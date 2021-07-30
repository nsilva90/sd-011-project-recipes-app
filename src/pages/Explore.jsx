import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  const name = 'Explorar';
  const showSearchButton = false;
  return (
    <div>
      <Header pageName={ name } showSearchButton={ showSearchButton } />
      Explore
      <Footer />
    </div>
  );
}
