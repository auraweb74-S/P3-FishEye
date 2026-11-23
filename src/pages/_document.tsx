import { Html, Head, Main, NextScript } from "next/document";

/**
 * Définit la structure HTML commune aux pages.
 *
 * Le document est rendu côté serveur.
 * L'attribut lang="fr" indique la langue principale
 * aux navigateurs et aux technologies d'assistance.
 *
 * @returns La structure HTML initiale de l'application.
 */
export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}