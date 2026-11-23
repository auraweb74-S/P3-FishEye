
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

import { getPhotographers } from "../lib/prisma-db";
import PhotographerCard from "../components/photographers/PhotographerCard";
import Grid from "../components/ui/Grid";

/**
 * Définit les données transmises à la page d'accueil.
 *
 * Le type des photographes est déduit automatiquement
 * du résultat de la fonction getPhotographers().
 */
type HomeProps = {
  photographers: Awaited<ReturnType<typeof getPhotographers>>;
};

/**
 * Récupère les photographes depuis SQLite via Prisma.
 *
 * Cette fonction est exécutée uniquement côté serveur,
 * à chaque requête vers la page d'accueil.
 *
 * Les données récupérées sont transmises à HomePage
 * grâce à l'objet props retourné.
 *
 * @returns Les photographes à afficher sur la page.
 */
export const getServerSideProps: GetServerSideProps<HomeProps> =
  async () => {
    const photographers = await getPhotographers();

    return {
      props: {
        photographers,
      },
    };
  };

/**
 * Affiche la page d'accueil de FishEye.
 *
 * La page reçoit les photographes depuis getServerSideProps
 * et délègue leur affichage à des composants réutilisables :
 *
 * - Grid : organise les éléments dans une grille responsive.
 * - PhotographerCard : affiche les informations d'un photographe.
 *
 * @param photographers - Liste des photographes à afficher.
 * @returns Le contenu principal de la page d'accueil.
 */
export default function HomePage({
  photographers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <section aria-label="Liste des photographes">
        <Grid>
          {photographers.map((photographer) => (
            <PhotographerCard
              key={photographer.id}
              photographer={photographer}
            />
          ))}
        </Grid>
      </section>
    </main>
  );
}
