# Fintech Thesis Wallet

## Obiettivi del progetto
- Realizzare un wallet fintech ispirato a Revolut con focus su conti multivaluta e transazioni simulate.
- Dimostrare allineamento a principi di sicurezza (AgID, GDPR, PSD2) e best practice di ingegneria del software.
- Preparare un prototipo full-stack API-based con autenticazione OIDC, dashboard utente e pipeline CI/CD minima.

## Funzionalità MVP
- Login sicuro tramite OIDC (PKCE) e gestione token.
- Consultazione elenco conti personali e relativo saldo aggiornato.
- Visualizzazione e filtro della lista transazioni per periodo/categoria.
- Creazione di transazioni simulate con controllo idempotenza.

## Stack previsto
| Layer | Tecnologia | Motivazione |
|-------|------------|-------------|
| Frontend | React + TypeScript + Vite | SPA performante con typed UI e routing flessibile |
| Backend | FastAPI + Pydantic | API rapide da sviluppare, validazione schema integrata |
| Database | PostgreSQL + pgcrypto + RLS | Persistenza sicura e controlli su base riga |
| Identity | Keycloak (OIDC/OAuth2) | Gestione utenti, ruoli e MFA gestita |
| Gateway | NGINX | Reverse proxy, CORS, rate limiting, security headers |
| Observability | Prometheus, Grafana, Loki (roadmap) | Metriche, log strutturati e dashboard |
| DevOps | Docker Compose, GitHub Actions | Sviluppo locale coerente e CI automatizzata |

## Struttura repository
```
.
├── backend/    # Servizi FastAPI, migrazioni, test Python
├── frontend/   # Applicazione React/Vite + assets UI
├── infra/      # Configurazioni infrastrutturali (NGINX, compose, IaC)
├── docs/       # Documentazione tecnica (OpenAPI, ER, diagrammi) [da aggiungere]
├── README.md
├── README_Fintech_Thesis.md
└── stato_avanzamento.md
```

## Comandi base (work in progress)
```bash
# Clonare il repository
git clone <repo-url> thesis-fintech-wallet
cd thesis-fintech-wallet

# Installazione dipendenze backend (placeholder)
cd backend
python -m venv .venv
.venv\Scripts\activate    # Windows
pip install -r requirements.txt

# Installazione dipendenze frontend (placeholder)
cd ../frontend
npm install

# Avvio stack (sarà disponibile con docker-compose.yml)
cd ..
docker compose up -d --build
```

> Nota: i file `requirements.txt`, `package.json` e `docker-compose.yml` saranno introdotti nei prossimi step del piano di lavoro.

## Riferimenti utili
- `README_Fintech_Thesis.md` per descrizione estesa, principi di sicurezza e roadmap.
- `stato_avanzamento.md` per monitorare progressi, rischi e prossimi passi.
