import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

function Provider({ children }) {
  const [catalog, setCatalog] = useState('');
  const context = { catalog, setCatalog };

  return (
    <GlobalContext.Provider value={ context }>{ children }</GlobalContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
