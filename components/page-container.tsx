import { FC, useEffect } from "react";
import styles from "./page-container.module.css";
import { Nav } from "./nav";
import { Grid } from "./grid";
import { useRainbowBg } from "../hooks/use-rainbow-bg";

interface PageContainerProps {
  children: React.ReactNode;
}
export const PageContainer: FC<PageContainerProps> = ({ children }) => {
  useRainbowBg();
  return (
    <div className={styles.container}>
      <Nav />
      {children}
    </div>
  );
};
