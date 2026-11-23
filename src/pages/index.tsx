import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

import {
  getPhotographers,
  getPhotographerById,
} from "../lib/prisma-db";

/**
 * Définit les données transmises à la page d'accueil.
 */
type HomeProps = {
  photographers: Awaited<ReturnType<typeof getPhotographers>>;
  mimiName: string | null;
};

/**
 * Récupère les données côté serveur à chaque requête.
 *
 * @returns Les photographes et le résultat du test par ID.
 */
export const getServerSideProps: GetServerSideProps<HomeProps> =
  async () => {
    const photographers = await getPhotographers();
    const mimi = await getPhotographerById(243);

    return {
      props: {
        photographers,
        mimiName: mimi?.name ?? null,
      },
    };
  };

/**
 * Affiche temporairement les données issues de Prisma.
 *
 * @param photographers - Liste des photographes.
 * @param mimiName - Nom du photographe recherché ou null.
 * @returns La page d'accueil de test.
 */
export default function HomePage({
  photographers,
  mimiName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <h1>FishEye — Test Prisma (Pages Router)</h1>

      <p>{photographers.length} photographes trouvés</p>

      <ul>
        {photographers.map((photographer) => (
          <li key={photographer.id}>
            {photographer.name}
          </li>
        ))}
      </ul>

      <p>Photographe recherché : {mimiName ?? "Introuvable"}</p>
    </main>
  );
}
