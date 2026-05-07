# Movie Dashboard — Vercel/GitHub Ready

Projet React + Vite prêt à déployer sur Vercel ou GitHub.

## Lancer en local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Déploiement Vercel

- Framework preset : `Vite`
- Build command : `npm run build`
- Output directory : `dist`

## Variable d'environnement recommandée

Dans Vercel > Settings > Environment Variables :

```text
VITE_TMDB_API_KEY=ta_cle_api_tmdb
```

Le code contient une clé de fallback pour test, mais la variable Vercel est préférable pour un dépôt GitHub public.
