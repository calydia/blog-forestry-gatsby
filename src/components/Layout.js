import React from 'react';
import ThemeContext from '../context/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default ({ children }) => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <div className={theme.dark ? 'dark' : 'light'}>
          <Header />
          {children}
          <Footer />
        </div>
      )}
    </ThemeContext.Consumer>
  );
};
