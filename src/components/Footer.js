import React from 'react';
import TwitterIcon from '../assets/icons/twitter.svg';
import RssIcon from '../assets/icons/rss.svg';

export default () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <a
          href="https://sanna.ninja"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="My portfolio"
        >
          Sanna Mäkinen
        </a>
        <div className="links">
          <a
            href="https://twitter.com/schalallalaa"
            className="twitter-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="My Twitter profile"
          >
            <span className="link-name">Twitter</span>
            <TwitterIcon />
          </a>
          <a href="/rss.xml" className="rss-link" aria-label="Blog RSS feed">
            <span className="link-name">RSS</span>
            <RssIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};