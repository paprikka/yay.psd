import styles from "./nav.module.css";
import Link from "next/link";
export const Nav = () => (
  <nav className={styles.container}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link href="/">
          <a>All</a>
        </Link>
      </li>
      <li className={styles.item}>
        <Link href="/">
          <a>About</a>
        </Link>
      </li>
    </ul>
  </nav>
);
