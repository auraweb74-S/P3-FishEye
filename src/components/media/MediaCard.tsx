import MediaLike from "./MediaLike";
import styles from "./MediaCard.module.css";
import Image from "next/image";

/**
 * Données nécessaires à l'affichage d'un média.
 */
type MediaCardProps = {
    media: {
        id: number;
        title: string;
        image: string | null;
        video: string | null;
        likes: number;
    };
    onLikeUpdated: (mediaId: number, newLikes: number) => void;
};

/**
 * Affiche une carte contenant une image ou une vidéo,
 * accompagnée du titre du média.
 *
 * @param media - Données du média à afficher.
 * @returns Une carte média ou null si aucun fichier n'est disponible.
 */
export default function MediaCard({
    media,
    onLikeUpdated,
}: MediaCardProps) {
    // N'affiche rien si le média ne possède ni image ni vidéo.
    if (!media.image && !media.video) {
        return null;
    }

    return (
        <article className={styles.card}>
            {media.video ? (
                // Cas vidéo : afficher une vidéo.
                <video
                    className={styles.visual}
                    controls
                    preload="metadata"
                    poster={
                        media.image ? `/assets/${media.image}` : undefined
                    }
                    aria-label={`Vidéo : ${media.title}`}
                >
                    <source
                        src={`/assets/${media.video}`}
                        type="video/mp4"
                    />
                    Votre navigateur ne prend pas en charge la vidéo.
                </video>
            ) : media.image ? (
                // Cas image : afficher une photographie.
                <Image
                    className={styles.visual}
                    src={`/assets/${media.image}`}
                    alt={media.title}
                    width={200}
                    height={200}
                />
            ) : null}

            <h2 className={styles.title}>{media.title}</h2>

            <MediaLike
                mediaId={media.id}
                title={media.title}
                likes={media.likes}
                onLikeUpdated={onLikeUpdated}
            />
        </article>
    );
}
