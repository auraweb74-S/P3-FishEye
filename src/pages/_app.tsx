import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import SiteHeader from "../components/layout/SiteHeader";
import "../styles/globals.css";

/**
 * Composant racine commun aux pages du Pages Router.
 *
 * @param Component - Page correspondant à l'URL visitée.
 * @param pageProps - Propriétés transmises à cette page.
 * @returns La page active avec ses propriétés.
 */
export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();

    return (

        <>
            <SiteHeader
                title={router.pathname === "/" ? "Nos photographes" : undefined}
            />
            <Component {...pageProps} />
        </>
    );
}

/*
 * Le spread operator transmet les propriétés d'un objet.
 *
 * <Component {...pageProps} />
 *
 * Si pageProps contient photographers et mimiName,
 * cela équivaut à :
 *
 * <Component
 *   photographers={pageProps.photographers}
 *   mimiName={pageProps.mimiName}
 * />
 *
 * Le spread operator (...) est une syntaxe JavaScript ES6.
 */