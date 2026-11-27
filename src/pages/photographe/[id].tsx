import MediaSort from "@/components/media/MediaSort";
import Grid from "@/components/ui/Grid";
import MediaCard from "@/components/media/MediaCard";

import type { SortCriteria } from "@/components/media/MediaSort";
import { useState } from "react";

import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
} from "next";

import {
    getPhotographerById,
    getMediasByPhotographerId,
} from "../../lib/prisma-db";

/**
 * Représente un photographe existant.
 */
type Photographer = NonNullable<
    Awaited<ReturnType<typeof getPhotographerById>>
>;

/**
 * Déduit le type du tableau de médias renvoyé par Prisma.
 */
type Medias = Awaited<
    ReturnType<typeof getMediasByPhotographerId>
>;

/**
 * Définit les données reçues par la page photographe.
 */
type PhotographerPageProps = {
    photographer: Photographer;
    medias: Medias;
};

/**
 * Récupère un photographe et ses médias depuis SQLite.
 *
 * Cette fonction s'exécute côté serveur à chaque requête.
 *
 * @param context - Contexte fourni par Next.js.
 * @returns Les données du photographe ou une réponse 404.
 */
export const getServerSideProps: GetServerSideProps<
    PhotographerPageProps
> = async (context) => {
    const rawId = context.params?.id;

    if (typeof rawId !== "string") {
        return { notFound: true };
    }

    const id = Number(rawId);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return { notFound: true };
    }

    const photographer = await getPhotographerById(id);

    if (!photographer) {
        return { notFound: true };
    }

    const medias = await getMediasByPhotographerId(id);

    return {
        props: {
            photographer,
            medias,
        },
    };
};

/**
 * Affiche le profil d'un photographe et sa galerie.
 *
 * @param photographer - Données du photographe.
 * @param medias - Médias du photographe.
 * @returns La page du photographe.
 */
export default function PhotographerPage({
    photographer,
    medias,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    // Médias conservés dans le state pour actualiser les likes.
    const [currentMedias, setCurrentMedias] = useState(medias);

    // Critère de tri sélectionné par l'utilisateur.
    const [sortBy, setSortBy] = useState<SortCriteria>("popularite");

    // Calcule le total à partir des médias actuels.
    const totalLikes = currentMedias.reduce(
        (total, media) => total + media.likes,
        0
    );

    // Crée un nouveau tableau trié sans modifier currentMedias.
    const sortedMedias = currentMedias.toSorted((a, b) => {
        if (sortBy === "popularite") {
            return b.likes - a.likes;
        }

        if (sortBy === "date") {
            return b.date.localeCompare(a.date);
        }

        return a.title.localeCompare(b.title, "fr");
    });

    /**
     * Actualise les likes d'un média après confirmation de l'API.
     *
     * @param mediaId - Identifiant du média modifié.
     * @param newLikes - Nouveau compteur renvoyé par SQLite.
     */
    function handleLikeUpdated(mediaId: number, newLikes: number) {
        setCurrentMedias((previousMedias) =>
            previousMedias.map((media) =>
                media.id === mediaId
                    ? { ...media, likes: newLikes }
                    : media
            )
        );
    }

    return (
        <main>
            <h1>{photographer.name}</h1>

            <p>
                {photographer.city}, {photographer.country}
            </p>

            <p>{photographer.tagline}</p>

            <p>Total des likes : {totalLikes}</p>

            <MediaSort
                sortBy={sortBy}
                onSortChange={setSortBy}
            />

            <Grid>
                {sortedMedias.map((media) => (
                    <MediaCard
                        key={media.id}
                        media={media}
                        onLikeUpdated={handleLikeUpdated}
                    />
                ))}
            </Grid>
        </main>
    );
}
