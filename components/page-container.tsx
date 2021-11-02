import { FC, useEffect } from "react";
import styles from "./page-container.module.css";
import { Nav } from "./nav";
import { Grid } from "./grid";

interface PageContainerProps {
  children: React.ReactNode;
}
export const PageContainer: FC<PageContainerProps> = ({ children }) => {
  useEffect(() => {
    const cb = () => {
      const from = 51;
      const to = 219;
      const progress =
        window.scrollY /
        (document.body.getBoundingClientRect().height - window.innerHeight);
      document.body.style.backgroundColor = `hsl(${
        from + (to - from) * progress
      }deg 100% 50%)`;
      console.log(progress);
    };
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
  });
  return (
    <div className={styles.container}>
      <Nav />
      {children}
    </div>
  );
};
