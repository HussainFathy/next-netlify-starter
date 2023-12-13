// components/Header.js

import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/whoami">
              <a>Whoami</a>
            </Link>
          </li>
          <li>
            <Link href="/cve">
              <a>CVE</a>
            </Link>
          </li>
        </ul>
        <ul className="external-links">
          <li>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              Linkedin
            </a>
          </li>
          <li>
            <a href="mailto:your@email.com">
              Email
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
