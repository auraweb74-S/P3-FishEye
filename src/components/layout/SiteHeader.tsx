import Image from "next/image";
import Link from "next/link";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  title?: string;
};

/**
 * Affiche l'en-tête commun du site.
 *
 * Le logo permet de revenir à la page d'accueil.
 *
 * @returns L'en-tête contenant le logo FishEye.
 */
export default function SiteHeader({ title }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/images/logo-fisheye.svg"
          alt="FishEye — Accueil"
          width={200}
          height={50}
        />
      </Link>

      {title && <h1 className={styles.title}>{title}</h1>}
    </header>
  );
}