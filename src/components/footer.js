import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export default () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <a href="https://sanna.ninja">Sanna Mäkinen</a>
        <a
          href="https://twitter.com/schalallalaa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </div>
    </footer>
  );
};
