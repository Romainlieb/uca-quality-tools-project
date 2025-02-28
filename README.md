# uca-quality-tools-project

- Debugging et Performance

## 1. Debugging avec --inspect

### 1. Debugging avec --inspect

1. Je lance le projet en mode debug :

    ```bash
    node --inspect dist/index.js
    ```

2. J'accède aux outils de debug :

    1. J'ouvre Chrome et je tape `chrome://inspect` dans la barre d'adresse
    2. Je clique sur "Open dedicated DevTools for Node"

3. Je débugge :
    1. Je place des breakpoints directement dans mon code TypeScript
    2. J'utilise les outils de debug (step over, step into, watch expressions)
    3. J'inspecte les variables et la pile d'appels

## 2. Rapport de performance avec Autocannon

### Commande utilisée :

```bash
autocannon -c 100 -d 10 http://localhost:3000/posts
```

### Options :

1. `-c 100` : 100 connexions simultanées (je simule une charge moyenne)
2. `-d 10` : Durée du test de 10 secondes (suffisant pour avoir des résultats stables)

### Résultats :

```bash
Running 10s test @ http://localhost:3000/posts
100 connections

┌─────────┬──────┬──────┬───────┬──────┬──────┬───────┬──────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg  │ Stdev │ Max  │
├─────────┼──────┼──────┼───────┼──────┼──────┼───────┼──────┤
│ Latency │ 0 ms │ 0 ms │ 0 ms  │ 0 ms │ 0 ms │ 0 ms  │ 0 ms │
└─────────┴──────┴──────┴───────┴──────┴──────┴───────┴──────┘
┌───────────┬─────┬──────┬─────┬───────┬─────┬───────┬─────┐
│ Stat      │ 1%  │ 2.5% │ 50% │ 97.5% │ Avg │ Stdev │ Min │
├───────────┼─────┼──────┼─────┼───────┼─────┼───────┼─────┤
│ Req/Sec   │ 0   │ 0    │ 0   │ 0     │ 0   │ 0     │ 0   │
├───────────┼─────┼──────┼─────┼───────┼─────┼───────┼─────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 0 B │ 0 B   │ 0 B │ 0 B   │ 0 B │
└───────────┴─────┴──────┴─────┴───────┴─────┴───────┴─────┘

Req/Bytes counts sampled once per second.
# of samples: 10

62k requests in 10.04s, 0 B read
62k errors (0 timeouts)
```

### Interprétation :

- Latence : 0 ms (Normal en local)
- Requêtes par seconde : 0 (je détecte un problème)
- Erreurs : 62k erreurs (toutes les requêtes ont échoué)
- Problèmes identifiés :
    1. Toutes les requêtes ont échoué (62k erreurs)
    2. Aucune donnée n'a été lue (0 B)

## 6. Monitoring et Reporting d'Erreurs

### Configuration de Sentry

1. J'installe les dépendances nécessaires :

    ```bash
    npm install @sentry/node @sentry/types
    ```

2. Je configure Sentry dans `src/index.ts` :

    ```typescript
    import * as Sentry from "@sentry/node";

    Sentry.init({
        dsn: "VOTRE_DSN_SENTRY", // Je remplace par mon DSN
        tracesSampleRate: 1.0,
        environment: process.env.NODE_ENV || "development"
    });

    app.use(Sentry.Handlers.errorHandler());
    ```

### Ajout d'une route de test

1. Je crée une route pour tester les erreurs :

    ```typescript
    app.get("/error-test", (req: Request, res: Response) => {
        try {
            throw new Error("Ceci est une erreur de test pour Sentry");
        } catch (error) {
            Sentry.captureException(error);
            res.status(500).render("error", {
                message: "Une erreur s'est produite",
                error: process.env.NODE_ENV === "development" ? error : {}
            });
        }
    });
    ```

2. Je crée la vue d'erreur `src/views/error.ejs` :
    ```ejs
    <!DOCTYPE html>
    <html>
    <head>
        <title>Erreur</title>
    </head>
    <body>
        <h1>Erreur</h1>
        <p><%= message %></p>
        <% if (error && error.message) { %>
            <p>Détails : <%= error.message %></p>
        <% } %>
        <a href="/">Retour à l'accueil</a>
    </body>
    </html>
    ```

### Procédure de test

1. Je démarre le serveur :

    ```bash
    npm start
    ```

2. J'accède à la route de test :

    - Via le navigateur : `http://localhost:3009/error-test`
    - Via curl : `curl http://localhost:3009/error-test`

3. Je vérifie dans Sentry :
    - Je me connecte à mon compte Sentry
    - Je vais dans le projet correspondant
