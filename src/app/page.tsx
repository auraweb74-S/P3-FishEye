
import { Suspense } from "react";
import { getPhotographers, getPhotographerById } from "./prisma-db";

/**
 * Récupère et affiche les photographes depuis SQLite via Prisma.
 *
 * Ce Server Component asynchrone exécute les requêtes
 * côté serveur, sans exposer Prisma au navigateur.
 *
 * @returns La liste des photographes et le résultat
 * d'une recherche par identifiant.
 */
async function PhotographersList() {
  const photographers = await getPhotographers();

  // Test de récupération d'un photographe par son ID.
  // Mimi Keel possède l'identifiant 243 dans la base OCR.
  const mimi = await getPhotographerById(243);

  return (
    <>
      <p>{photographers.length} photographes trouvés</p>

      <ul>
        {photographers.map((photographer) => (
          <li key={photographer.id}>
            {photographer.name}
          </li>
        ))}
      </ul>

      {/* Gère le cas où le photographe recherché n'existe pas. */}
      <p>Photographe recherché : {mimi?.name ?? "Introuvable"}</p>
    </>
  );
}

/**
 * Affiche la page d'accueil temporaire de FishEye.
 *
 * Suspense permet à Next.js d'afficher la structure
 * de la page pendant que PhotographersList attend
 * les données de la base SQLite.
 *
 * @returns La page avec un état de chargement
 * et la liste des photographes.
 */
export default function HomePage() {
  return (
    <main>
      <h1>FishEye — Test Prisma</h1>

      <Suspense fallback={<p>Chargement des photographes...</p>}>
        <PhotographersList />
      </Suspense>
    </main>
  );
}
