// components/Header.js

import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header>
      <nav>
        <div className={styles.responsiveDivTop}>
          <Link href="/">
            <a><b>Home</b></a>
          </Link>
          |
          <Link href="/whoami">
            <a><b>Whoami</b></a>
          </Link>
          |
          <Link href="/posts">
            <a><b>Posts</b></a>
          </Link>
          |
          <Link href="/cve">
            <a><b>CVE</b></a>
          </Link>
        </div>
        <div className={styles.responsiveDivBottom}>
          Links:
          <a href="https://github.com/0xless">GitHub</a>
          |
          <a href="https://www.linkedin.com/in/matteo-cosentino/">Linkedin</a>
          |
          <a href="mailto:contact@lessonsec.com">Email</a>
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
