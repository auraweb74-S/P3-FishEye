import { useState } from "react";

import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
} from "next";

import {
    getPhotographerById,
    getMediasByPhotographerId,
} from "../../lib/prisma-db";

import Grid from "@/components/ui/Grid";
import MediaCard from "@/components/media/MediaCard";

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

    // Récupère les médias appartenant à ce photographe.
    const medias = await getMediasByPhotographerId(id);

    return {
        props: {
            photographer,
            medias,
        },
    };
};

/**
 * Affiche la page individuelle d'un photographe.
 *
 * @param photographer - Photographe transmis par getServerSideProps.
 * @param medias - Médias transmis par getServerSideProps.
 * @returns La page de profil du photographe.
 */
export default function PhotographerPage({
    photographer,
    medias,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [currentMedias, setCurrentMedias] = useState(medias);

    const totalLikes = currentMedias.reduce(
        (total, media) => total + media.likes,
        0
    );

    /**
     * Actualise le compteur d'un média après confirmation de l'API.
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
            <Grid>
                {currentMedias.map((media) => (
                    <MediaCard
                        key={media.id}
                        media={media}
                        onLikeUpdated={handleLikeUpdated}
                    />
                ))}
            </Grid>
        </main>

    )
}
