
import { PrismaClient } from "../../generated/prisma/client";

/**
 * Initialise Prisma Client pour communiquer avec SQLite.
 *
 * Le chemin absolu est construit à partir du répertoire
 * de travail de Node.js afin que Next.js puisse accéder
 * correctement à la base de données.
 *
 * Le processus doit être lancé depuis la racine du projet.
 */
const prisma = new PrismaClient({
  datasourceUrl: `file:${process.cwd()}/prisma/dev.db`,
});

/**
 * Récupère tous les photographes enregistrés dans la base.
 *
 * @returns Une promesse contenant un tableau de photographes.
 */
export async function getPhotographers() {
  return await prisma.photographer.findMany();
}

/**
 * Recherche un photographe grâce à son identifiant unique.
 *
 * @param id - Identifiant du photographe recherché.
 * @returns Une promesse contenant le photographe ou null
 * si aucun photographe ne correspond à cet identifiant.
 */
export async function getPhotographerById(id: number) {
  return await prisma.photographer.findUnique({
    where: { id },
  });
}

/**
 * Récupère tous les médias appartenant à un photographe.
 *
 * La recherche utilise photographerId, la clé étrangère
 * reliant chaque média à son photographe.
 *
 * @param id - Identifiant du photographe propriétaire.
 * @returns Une promesse contenant un tableau de médias.
 * Le tableau est vide si aucun média ne correspond.
 */
export async function getMediasByPhotographerId(id: number) {
  return await prisma.media.findMany({
    where: {
      photographerId: id,
    },
  });
}

/**
 * Ajoute un like à un média existant.
 *
 * L'incrémentation atomique permet de modifier directement
 * la valeur en base sans lire puis réécrire le compteur.
 * Elle évite de perdre des incrémentations concurrentes.
 *
 * @param mediaId - Identifiant du média à modifier.
 * @returns Une promesse contenant le média mis à jour.
 * @throws Une erreur Prisma si le média n'existe pas
 * ou si la mise à jour échoue.
 */
export async function addLike(mediaId: number) {
  return await prisma.media.update({
    where: {
      id: mediaId,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
}
