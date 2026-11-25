
import { useState } from "react";
import styles from "./MediaLike.module.css";

/**
 * Propriétés du composant MediaLike.
 */
type MediaLikeProps = {
  mediaId: number;
  title: string;
  likes: number;
  onLikeUpdated: (mediaId: number, newLikes: number) => void;
};

/**
 * Affiche les likes d'un média et permet de les incrémenter
 * grâce à l'API Next.js.
 *
 * @param mediaId - Identifiant du média dans SQLite.
 * @param title - Titre utilisé pour l'accessibilité du bouton.
 * @param initialLikes - Nombre de likes reçu depuis le serveur.
 * @returns Un bouton de like avec son compteur.
 */
export default function MediaLike({
  mediaId,
  title,
  likes,
  onLikeUpdated,
}: MediaLikeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Enregistre un like et actualise le compteur.
   */
  async function handleLike() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/media/${mediaId}/like`,
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error("Impossible d'enregistrer le like.");
      }

      const data: { id: number; likes: number } =
        await response.json();

      onLikeUpdated(data.id, data.likes);
    } catch (error) {
      console.error(error);
      setError("Le like n'a pas pu être enregistré.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.mediaLike}>
      <span aria-live="polite">{likes}</span>

      <button
        type="button"
        onClick={handleLike}
        disabled={isLoading}
        aria-label={`Ajouter un like à ${title}`}
        className={styles.likeButton}
      >
        <span aria-hidden="true">♥</span>
      </button>

      {error && <p role="alert">{error}</p>}
    </div>
  );
}
