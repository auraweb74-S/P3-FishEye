
import type { NextApiRequest, NextApiResponse } from "next";
import { addLike } from "../../../../lib/prisma-db";

/**
 * Incrémente le nombre de likes d'un média.
 *
 * Accepte uniquement les requêtes POST.
 *
 * @param req - Requête HTTP contenant l'identifiant du média.
 * @param res - Réponse HTTP envoyée au navigateur.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Seule la méthode POST est autorisée.
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Méthode non autorisée",
    });
  }

  const rawId = req.query.id;
  const id = Number(rawId);

  // Vérifie que l'identifiant est valide.
  if (
    typeof rawId !== "string" ||
    !/^[1-9]\d*$/.test(rawId) ||
    !Number.isSafeInteger(id)
  ) {
    return res.status(400).json({
      error: "Identifiant invalide",
    });
  }

  try {
    const media = await addLike(id);

    return res.status(200).json({
      id: media.id,
      likes: media.likes,
    });
  } catch (error) {
    // Prisma renvoie P2025 si le média n'existe pas.
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        error: "Média introuvable",
      });
    }

    console.error("Erreur lors du like :", error);

    return res.status(500).json({
      error: "Erreur interne du serveur",
    });
  }
}
