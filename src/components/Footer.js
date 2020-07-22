import React from 'react';
import TwitterIcon from '../assets/icons/twitter.svg';
import RssIcon from '../assets/icons/rss.svg';

export default () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <a
          href="https://sanna.ninja"
          className="portfolio-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="portfolio-icon"></span>
          My portfolio
        </a>
        <div className="links">
          <a
            href="https://twitter.com/schalallalaa"
            className="twitter-link somelink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
            <span className="link-name">My Twitter profile</span>
          </a>
          <a href="/rss.xml" className="rss-link somelink">
            <RssIcon />
            <span className="link-name">Blog RSS feed</span>
          </a>
        </div>
      </div>
      <script src="/skip-content.js" type="text/javascript" />
    </footer>
  );
};
