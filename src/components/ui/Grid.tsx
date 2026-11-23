
import type { ReactNode } from "react";
import styles from "./Grid.module.css";

/**
 * Propriétés d'une grille générique.
 *
 * @property children - Éléments React à disposer.
 */
type GridProps = {
  children: ReactNode;
};

/**
 * Dispose des éléments dans une grille responsive.
 *
 * @param children - Éléments à afficher dans la grille.
 * @returns Une grille contenant les éléments fournis.
 */
export default function Grid({ children }: GridProps) {
  return <div className={styles.grid}>{children}</div>;
}
