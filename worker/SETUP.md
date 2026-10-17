# Cloudflare Worker Setup — Anleitung für Skap

## Voraussetzungen
1. Cloudflare Account registriert
2. Scoped API Token erstellt (Global Key reicht NICHT)

## Token erstellen
1. https://dash.cloudflare.com/profile/api-tokens
2. "Create Token" → "Custom token"
3. Permissions:
   - Account → Workers Scripts: Edit
   - Account → Workers KV Storage: Edit
   - Account → Account Settings: Read
4. Account Resources: Include → deinen Account
5. Token kopieren

## Token als Secret setzen
1. GitHub Repo: https://github.com/xxxn3m3s1sxxx/errsys-artifacts/settings/secrets/actions
2. "New repository secret"
3. Name: `CF_DEPLOY_TOKEN`
4. Value: <eingefügter Token>

## KV Namespace erstellen
```bash
cd worker
npx wrangler kv:namespace create "LOGS"
```
→ Kopiere die `id` in `wrangler.toml` (Zeile mit `<KV_NAMESPACE_ID>`)

## Workflow-Datei hinzufügen
1. Erstelle `.github/workflows/deploy-worker.yml` im Repo:

```yaml
name: Deploy Cloudflare Worker

on:
  push:
    branches: [main]
    paths:
      - 'worker/**'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy Worker
        uses: cloudflare/wrangler-action@v3
        with:
          workingDirectory: worker
          apiToken: ${{ secrets.CF_DEPLOY_TOKEN }}
          command: deploy
```

2. Commit + Push → Worker wird automatisch deployed

## Verifikation
```bash
# KV Namespace prüfen
npx wrangler kv:namespace list

# Worker testen
curl https://errsys-logging.<dein-subdomain>.workers.dev/errsys-artifacts/llms.txt
# Sollte llms.txt vom GitHub Pages Originstreamen

# KV-Eintrag prüfen
npx wrangler kv:key list --namespace-id=<KV_ID>
```

## Global Key rotieren
Den alten Key 028ddbee... SOFORT in Cloudflare rotieren/löschen — war im Swarm-Chat exponiert.
