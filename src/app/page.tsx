import { Suspense } from "react";
import { getPhotographers, getPhotographerById } from "./prisma-db";

async function PhotographersList() {
  const photographers = await getPhotographers();
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
      <p>Photographe recherché : {mimi?.name ?? "Introuvable"}</p>
    </>
  );
}

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