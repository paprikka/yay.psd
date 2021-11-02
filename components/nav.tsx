import styles from "./nav.module.css";
import Link from "next/link";
export const Nav = () => (
  <nav className={styles.container}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link href="/">
          <a className={styles.link}>All</a>
        </Link>
      </li>
      <li className={styles.item}>
        <Link href="/">
          <a className={styles.link}>About</a>
        </Link>
      </li>
    </ul>
  </nav>
);
