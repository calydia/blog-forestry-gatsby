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
          My portfolio
        </a>
        <div className="links">
          <a
            href="https://twitter.com/schalallalaa"
            className="twitter-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="My Twitter profile"
          >
            <span className="link-name">My Twitter profile</span>
            <TwitterIcon />
          </a>
          <a href="/rss.xml" className="rss-link" aria-label="Blog RSS feed">
            <span className="link-name">Blog RSS feed</span>
            <RssIcon />
          </a>
        </div>
      </div>
      <script src="/skip-content.js" type="text/javascript" />
    </footer>
  );
};
