
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
} from "next";

import { getPhotographerById } from "../../lib/prisma-db";

/**
 * Représente un photographe existant.
 *
 * ReturnType récupère le type de retour de la fonction Prisma.
 * Awaited extrait la valeur de la Promise.
 * NonNullable retire la possibilité d'obtenir null.
 */
type Photographer = NonNullable<
    Awaited<ReturnType<typeof getPhotographerById>>
>;

/**
 * Définit les données reçues par la page photographe.
 */
type PhotographerPageProps = {
    photographer: Photographer;
};

/**
 * Récupère un photographe à partir de l'identifiant dans l'URL.
 *
 * Cette fonction s'exécute côté serveur à chaque requête.
 * Elle vérifie l'identifiant avant d'interroger SQLite.
 *
 * @param context - Contexte fourni par Next.js (params, requête...).
 * @returns Les données du photographe ou une réponse 404.
 */
export const getServerSideProps: GetServerSideProps<
    PhotographerPageProps
> = async (context) => {
    const rawId = context.params?.id;

    // Vérifie que l'identifiant est une chaîne de caractères.
    if (typeof rawId !== "string") {
        return { notFound: true };
    }

    // Convertit l'identifiant de l'URL en nombre.
    const id = Number(rawId);

    // Refuse les identifiants invalides.
    if (!Number.isSafeInteger(id) || id <= 0) {
        return { notFound: true };
    }

    // Recherche le photographe dans SQLite via Prisma.
    const photographer = await getPhotographerById(id);

    // Aucun photographe ne correspond à cet identifiant.
    if (!photographer) {
        return { notFound: true };
    }

    return {
        props: {
            photographer,
        },
    };
};

/**
 * Affiche la page individuelle d'un photographe.
 *
 * @param photographer - Photographe transmis par getServerSideProps.
 * @returns La page de profil du photographe.
 */
export default function PhotographerPage({
    photographer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <main>
            <h1>{photographer.name}</h1>
            <p>
                {photographer.city}, {photographer.country}
            </p>
            <p>{photographer.tagline}</p>
        </main>
    );
}
