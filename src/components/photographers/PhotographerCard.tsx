
import Image from "next/image";
import Link from "next/link";
import styles from "./PhotographerCard.module.css";

/**
 * Données nécessaires à l'affichage d'une carte photographe.
 */
type PhotographerCardProps = {
  photographer: {
    id: number;
    name: string;
    portrait: string;
    city: string;
    country: string;
    tagline: string;
  };
};

/**
 * Présente un photographe et permet d'accéder à son profil.
 *
 * @param photographer - Données du photographe à afficher.
 * @returns Une carte contenant son portrait et ses informations.
 */
export default function PhotographerCard({
  photographer,
}: PhotographerCardProps) {
  return (
    <article className={styles.card}>
      <Link
        href={`/photographe/${photographer.id}`}
        className={styles.link}
      >
        <Image
          src={`/assets/${photographer.portrait}`}
          alt={`Portrait de ${photographer.name}`}
          width={200}
          height={200}
          className={styles.portrait}
        />

        <h2 className={styles.name}>{photographer.name}</h2>

        <p className={styles.location}>
          {photographer.city}, {photographer.country}
        </p>

        <p className={styles.tagline}>{photographer.tagline}</p>
      </Link>
    </article>
  );
}
