import { FC } from "react";
import styles from "./page-container.module.css";
import { Nav } from "./nav";
import { Grid } from "./grid";

interface PageContainerProps {
  children: React.ReactNode;
}
export const PageContainer: FC<PageContainerProps> = ({ children }) => (
  <div className={styles.container}>
    <Nav />
    {children}
  </div>
);
