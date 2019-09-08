import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import ThemeContext from '../context/ThemeContext'
import Header from '../components/header'
import Footer from '../components/footer'

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
  )
}
