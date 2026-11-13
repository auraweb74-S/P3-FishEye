
# FishEye — Projet 3 OpenClassrooms

Application web de présentation de photographes freelances, développée dans le cadre du parcours Développeur Full-Stack JavaScript d'OpenClassrooms.

L'objectif est de construire une application responsive et accessible, permettant de consulter les profils de photographes, leurs galeries de médias et d'interagir avec leurs contenus.

## Technologies utilisées

- Next.js 16 — App Router
- React
- TypeScript
- CSS Modules
- Prisma ORM 6
- SQLite
- Git

## État d'avancement

### Exercice 1 — Initialisation et back-end

- [x] Initialiser Next.js avec TypeScript
- [x] Installer et configurer Prisma
- [x] Intégrer la base de données SQLite fournie
- [x] Intégrer les images et vidéos
- [x] Développer les quatre fonctions d'accès aux données
- [x] Vérifier les fonctions avec Prisma et Next.js
- [x] Documenter les fonctions avec JSDoc

### Exercice 2 — Interface utilisateur

- [ ] Construire l'accueil à partir des maquettes Figma
- [ ] Créer les pages individuelles des photographes
- [ ] Afficher les galeries photos et vidéos
- [ ] Implémenter le tri et les likes
- [ ] Développer la lightbox et le formulaire de contact
- [ ] Vérifier le responsive et l'accessibilité

## Installation locale

### Prérequis

- Node.js (version 22 utilisée pendant le développement)
- npm
- Git

### 1. Installer les dépendances

Depuis la racine du projet :

```bash
npm ci
```

Cette commande installe les dépendances définies dans `package-lock.json`.

### 2. Configurer l'environnement

Copier le fichier d'exemple :

```bash
cp .env.example .env
```

Le fichier contient :

```env
DATABASE_URL="file:./dev.db"
```

Cette variable configure la connexion SQLite utilisée par les outils Prisma.

### 3. Générer Prisma Client

```bash
npx prisma generate
```

Cette commande génère le client TypeScript à partir du fichier `prisma/schema.prisma`.

Le client généré se trouve dans `generated/prisma/`. Ce dossier est exclu de Git et doit être régénéré après l'installation.

La base SQLite `prisma/dev.db` est déjà fournie avec le projet. Aucune migration ni installation de serveur SQL n'est nécessaire pour utiliser les données initiales.

### 4. Démarrer l'application

```bash
npm run dev
```

Ouvrir http://localhost:3000 dans le navigateur.

Les commandes sont à exécuter depuis la racine du projet.

## Organisation du projet

```text
fisheye/
├── generated/             # Client Prisma généré (ignoré par Git)
├── prisma/
│   ├── schema.prisma      # Modèles et relations
│   └── dev.db             # Base SQLite fournie
├── public/
│   └── assets/            # Photos et vidéos
├── src/
│   └── app/
│       ├── layout.tsx     # Layout principal
│       ├── page.tsx       # Page d'accueil (actuellement de test)
│       └── prisma-db.ts   # Fonctions d'accès aux données
├── .env.example           # Exemple de configuration
└── package.json
```

## Base de données

La base SQLite contient deux modèles liés par une relation un-à-plusieurs :

- `Photographer` : informations des photographes
- `Media` : photos, vidéos et métadonnées associées

Chaque média appartient à un photographe grâce à la clé étrangère `photographerId`.

Données initiales :
- 6 photographes
- 59 médias

### Fonctions Prisma

Le fichier `src/app/prisma-db.ts` contient quatre fonctions :

| Fonction | Responsabilité |
|---|---|
| `getPhotographers()` | Récupérer tous les photographes |
| `getPhotographerById(id)` | Récupérer un photographe par son identifiant |
| `getMediasByPhotographerId(id)` | Récupérer les médias d'un photographe |
| `addLike(mediaId)` | Incrémenter les likes d'un média |

Ces fonctions sont exécutées côté serveur.

La connexion Prisma Client utilise un chemin SQLite construit à partir de `process.cwd()`, ce qui suppose de lancer Next.js depuis la racine du projet.

## Tests et vérifications

Vérifier les types Next.js et TypeScript :

```bash
npx next typegen
npx tsc --noEmit
```

Vérifier le code avec ESLint :

```bash
npm run lint
```

Explorer la base de données avec Prisma Studio :

```bash
npx prisma studio
```

Prisma Studio permet de consulter et modifier les données. Toute modification est appliquée à la base locale.

Les quatre fonctions Prisma ont été testées pendant l'exercice 1, dont `addLike()` à travers une requête HTTP POST temporaire. La route de test a ensuite été supprimée.

## Documentation

Les fonctions et composants importants sont documentés avec JSDoc pour expliquer leur rôle, leurs paramètres, les valeurs retournées et les décisions techniques particulières.

## Ressources

- [Starter officiel OpenClassrooms](https://github.com/OpenClassrooms-Student-Center/P3-option-NextJS-D-veloppeur-Full-stack-Front-end-avanc-)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)

## Contexte

Projet pédagogique réalisé dans le cadre de la formation OpenClassrooms.

L'application est en cours de développement.
