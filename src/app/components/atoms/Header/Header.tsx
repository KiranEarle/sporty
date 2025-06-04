/* eslint-disable @next/next/no-img-element */

import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.Header}>
      <img src="/sporty.svg" alt="sporty logo" />
    </header>
  );
};

export default Header;
