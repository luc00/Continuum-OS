# Guida al Deploy su Vercel — Continuum Work OS

Il progetto è pronto per il deploy su **Vercel** con frontend **Vite + React** e backend API serverless **Express (`/api/index.ts`)**.

## Struttura per Vercel
- `vercel.json`: configura il build statico Vite (`dist/`), instrada `/api/*` sulla Serverless Function `/api/index.ts` e gestisce il fallback SPA verso `/index.html`.
- `api/index.ts` + `lib/apiApp.ts`: espone tutti gli endpoint `/api/gemini/*` (e `/api/health`) su Vercel mantenendo intatto `server.ts` per sviluppo locale.

---

## Opzione A — Deploy con Vercel CLI (Consigliata)
1. Installa o accedi a Vercel CLI dal terminale del progetto:
   ```bash
   npx vercel login
   ```
2. Avvia il deploy in produzione:
   ```bash
   npx vercel --prod
   ```
   *(Vercel rileverà automaticamente `vercel.json`, eseguirà `npm run build` e pubblicherà `dist/` insieme alle API `/api/*`.)*

---

## Opzione B — Deploy da GitHub / GitLab / Bitbucket
1. Carica il repository su GitHub.
2. Vai su [vercel.com/new](https://vercel.com/new) e importa il repository.
3. Impostazioni rilevate automaticamente da `vercel.json`:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. *(Opzionale)* Nelle **Environment Variables** su Vercel aggiungi:
   - `GEMINI_API_KEY`: la tua chiave API Gemini (se assente, i motori usano automaticamente il fallback curato ad alta fedeltà senza errori).
5. Clicca **Deploy**.
