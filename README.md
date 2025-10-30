# Fintech Thesis Wallet
> Wallet fintech ispirato a Revolut che enfatizza sicurezza (RLS, MFA, OIDC) e automazione per una tesi sperimentale.

_Badges_: pipeline CI/CD e metriche saranno pubblicate dopo l’attivazione di GitHub Actions.

## Descrizione
Applicazione full-stack (backend FastAPI + future frontend React) che offre conti multi-valuta, transazioni simulate con idempotenza e un microservizio OTP interno. Il progetto dimostra come implementare controlli di sicurezza per linea (Row-Level Security, MFA, OIDC) e come industrializzare migrazioni, seed e test automatici in un contesto accademico.

## Indice
1. [Installazione](#installazione)
2. [Utilizzo rapido](#utilizzo-rapido)
3. [Esempi di utilizzo](#esempi-di-utilizzo)
4. [Configurazione](#configurazione)
5. [Architettura e documentazione tecnica](#architettura-e-documentazione-tecnica)
6. [Limitazioni, problemi noti e TODO](#limitazioni-problemi-noti-e-todo)
7. [Come contribuire](#come-contribuire)
8. [Licenza](#licenza)
9. [Contatti e crediti](#contatti-e-crediti)

## Installazione
1. **Clona il repository**
   ```bash
   git clone https://github.com/aturino22/revolut-like-project.git
   cd revolut-like-project
   ```
2. **Servizi di base**
   ```bash
   cd infra
   docker compose up -d postgres
   docker compose ps
   cd ..
   ```
3. **Backend Python**
   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate          # Windows
   pip install -r requirements.txt
   Copy-Item ..\.env.example .env  # facoltativo
   cd ..
   ```
4. **Migrazioni e seed**
   ```bash
   python -m backend.db.manage bootstrap   # migrazioni + seed
   ```
5. **(Opzionale) Frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

## Utilizzo rapido
- **Avvio backend**  
  ```bash
  cd backend
  .venv\Scripts\activate
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
  ```
- **Gestione database**  
  ```bash
  python -m backend.db.manage migrate   # solo migrazioni
  python -m backend.db.manage seed      # solo seed
  ```
- **Test di integrazione**  
  ```bash
  backend\.venv\Scripts\python.exe -m pytest
  ```
- **Connessione da DBeaver / client SQL**
  ```
  Host: 127.0.0.1
  Porta: 5432
  DB: thesis_fintech
  User: thesis_admin
  Password: thesis_admin
  ```

## Esempi di utilizzo
### Chiamate API di base
```bash
curl -H "X-User-Id: aaaaaaaa-1111-2222-3333-444444444444" http://localhost:8000/accounts

curl -H "X-User-Id: aaaaaaaa-1111-2222-3333-444444444444" \
     -H "Content-Type: application/json" \
     -d '{"account_id":"bbbbbbbb-1111-2222-3333-555555555555","amount":"50.00","currency":"EUR","category":"food","direction":"buy","idem_key":"demo-1"}' \
     http://localhost:8000/transactions
```
### Accesso al database da FastAPI
```python
from fastapi import APIRouter, Depends
from psycopg import AsyncConnection

from backend.app.db import get_connection_with_rls

router = APIRouter(prefix="/accounts", tags=["Accounts"])

@router.get("")
async def list_accounts(conn: AsyncConnection = Depends(get_connection_with_rls)):
    async with conn.cursor() as cur:
        await cur.execute("SELECT id, balance FROM accounts ORDER BY created_at")
        return await cur.fetchall()
```
La dipendenza `get_connection_with_rls` imposta `app.current_user_id` nella sessione PostgreSQL, sbloccando le policy Row-Level Security per ogni richiesta.

## Configurazione
- **Variabili d’ambiente principali (`.env`)**
  ```
  DB_HOST=127.0.0.1
  DB_PORT=5432
  DB_NAME=thesis_fintech
  DB_USER=thesis_admin
  DB_PASSWORD=thesis_admin
  DB_POOL_MIN_SIZE=1
  DB_POOL_MAX_SIZE=10
  DB_POOL_TIMEOUT=30.0
  ```
- **Header temporaneo per identity**: `X-User-Id` (verrà sostituito dai token Keycloak).  
- **Dipendenze esterne**: PostgreSQL 16 via Docker Compose; in roadmap Keycloak, gateway NGINX, servizi OTP reali.  
- **File da consultare**: `infra/docker-compose.yml`, `docs/openapi.yaml`, `backend/db/er/`.

## Architettura e documentazione tecnica
- **Struttura repo**
  ```
  backend/   # FastAPI, migrazioni SQL, test Python
  frontend/  # React/Vite (in preparazione)
  infra/     # Docker Compose, NGINX, provisioning
  docs/      # Decision log, ER, test plan
  progress/  # Log giornalieri (Day X)
  ```
- **Componenti chiave**
  - Backend FastAPI con connessione asincrona a PostgreSQL e controlli d’idempotenza.
  - Row-Level Security su `accounts`, `transactions`, `otp_audits`, `security_logs`, applicata via `set_current_user_id`.
  - Documentazione di sicurezza e test plan in `docs/`.
  - Script di migrazione/seed orchestrati da `python -m backend.db.manage {migrate|seed|bootstrap}`.
- **Referenze**
  - `README_Fintech_Thesis.md`: panoramica estesa, principi di sicurezza, roadmap.
  - `stato_avanzamento.md`: sintesi progressi, rischi, prossimi passi.
  - `docs/test-plan-saturday.md`: piano E2E per la sessione di collaudo.

## Limitazioni, problemi noti e TODO
- Integrazione Keycloak/OIDC non ancora attiva: l’header `X-User-Id` serve solo in fase prototipale.
- Microservizio OTP email/SMS in lavorazione, da integrare con gli endpoint di backend.
- Frontend React/Vite non ancora implementato; il prototipo è backend-only.
- Mancano pipeline CI/CD e test di hardening (rate limiting, headers di sicurezza su gateway).
- Sessione di test end-to-end da completare (vedi `docs/test-plan-saturday.md`).

## Come contribuire
1. Fork del repository e creazione di un branch tematico.
2. Segui le guideline di commit riportate in `guidelines.std` (`[<SCOPE> - <ACTION>] - descrizione`).
3. Aggiorna/aggiungi test (`pytest`) e assicurati che `python -m backend.db.manage bootstrap` giri senza errori.
4. Apri una pull request descrivendo:
   - Motivazione della modifica.
   - Impatto su migrazioni/configurazioni.
   - Istruzioni di test/verifica.

## Licenza
Licenza in definizione: il file `LICENSE` verrà aggiunto prima della pubblicazione pubblica. Nel frattempo l’uso è limitato al progetto di tesi dell’autore.

## Contatti e crediti
- **Autore**: Alessandro Turino — <turino.alessandro2201@gmail.com>
- **Documentazione**: `docs/decision-log.md`, `progress/Day N - ddmmyyyy.md`
- Ringraziamenti a relatori e colleghi che supportano il progetto accademico.
