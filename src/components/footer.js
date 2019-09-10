import React from 'react';
import Twitter from '../assets/icons/twitter.svg';
import Rss from '../assets/icons/rss.svg';

export default () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <a href="https://sanna.ninja">Sanna Mäkinen</a>
        <div className="links">
          <a
            href="https://twitter.com/schalallalaa"
            className="twitter-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="link-name">Twitter</span>
            <Twitter />
          </a>
          <a href="/rss.xml" className="rss-link">
            <span className="link-name">RSS</span>
            <Rss />
          </a>
        </div>
      </div>
    </footer>
  );
};
