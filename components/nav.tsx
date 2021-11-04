import styles from "./nav.module.css";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { FC } from "react";

interface NavLinkProps {
  to: string;
  currentPath: string;
  label: string;
}
const NavLink: FC<NavLinkProps> = ({ to, currentPath, label }) => {
  const className =
    to === currentPath ? `${styles.link} ${styles.linkCurrent}` : styles.link;
  return (
    <Link href={to}>
      <a className={className}>{label}</a>
    </Link>
  );
};
export const Nav = () => {
  const router = useRouter();
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink to="/" currentPath={router.pathname} label="Art!" />
        </li>
        <li className={styles.item}>
          <NavLink to="/about" currentPath={router.pathname} label="About" />
        </li>
        <li className={styles.item}>
          <NavLink to="/shhh" currentPath={router.pathname} label="Shhh!" />
        </li>
      </ul>
    </nav>
  );
};
