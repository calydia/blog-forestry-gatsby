import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';
import ThemeContext from '../context/ThemeContext';

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            menuLinks {
              name
              link
              id
            }
          }
        }
      }
    `
  );

  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div className="header-wrapper">
          <a href="#skip-target" id="skip" className="skip-link">
            Skip to content
          </a>
          <button className="dark-switcher" onClick={theme.toggleDark}>
            {theme.dark ? <span>Light mode</span> : <span>Dark mode</span>}
          </button>
          <header className="main-header">
            <Link className="home-main" to="/">
              <span className="name">Sanna Mäkinen</span>
              <span className="blog">Blog</span>
            </Link>
            <nav aria-label="Main menu">
              <ul className="main-menu">
                {data.site.siteMetadata.menuLinks.map((item) => {
                  return (
                    <li className="main-menu-item" key={item.id}>
                      <Link
                        to={item.link}
                        activeClassName="menu-active"
                        partiallyActive={true}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </header>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};
