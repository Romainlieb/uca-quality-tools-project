# uca-quality-tools-project

- Debugging et Performance


1. Debugging avec --inspect

    1. Debugging avec --inspect
        a. Lancer le projet en mode debug :
            node --inspect dist/index.js

    2. Accéder aux outils de debug :
        a. Ouvrir Chrome et taper chrome://inspect dans la barre d'adresse

        b. Cliquez sur "Open dedicated DevTools for Node"

    3. Débugger :
        a. Placez des breakpoints directement dans votre code TypeScript

        b. Utilisez les outils de debug (step over, step into, watch expressions)

        c. Inspectez les variables et la pile d'appels

2. Rapport de performance avec Autocannon

    Commande utilisée :
        autocannon -c 100 -d 10 http://localhost:3000/posts

    Options :
        a. -c 100 : 100 connexions simultanées (simule une charge moyenne)

        b. -d 10 : Durée du test de 10 secondes (suffisant pour avoir des résultats stables)

    Résultats :

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

    Interprétation :

    - Latence : 0 ms (Normal en local)
    - Requêtes par seconde : 0 (problème détecté)
    - Erreurs : 62k erreurs (toutes les requêtes ont échoué)
    - Problèmes identifiés :
        - Toutes les requêtes ont échoué (62k erreurs)
        - Aucune donnée n'a été lue (0 B)