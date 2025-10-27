# Decision Log

## Autenticazione
- **Data**: 2025-10-20 — **Giorno di sviluppo**: Day 1
- **Decisione**: Abilitare l'accesso cliente retail con email e password piu OTP a due fattori della durata di 1 minuto inviato via SMS o email in base alla preferenza dell'utente.
  **Motivo**: Rafforzare l'autenticazione con un secondo fattore temporaneo preservando una buona UX permettendo all'utente di scegliere il canale.
  **Benefici**: Riduce il rischio di accessi non autorizzati, supporta requisiti di sicurezza elevati e mantiene flessibilita operativa sui canali di consegna.

## Sicurezza
- **Data**: 2025-10-20 — **Giorno di sviluppo**: Day 1
- **Decisione**: Modellare un threat-user che effettua tentativi di brute force sul login e registrare log dedicati per questi eventi.
  **Motivo**: Validare la robustezza del sistema contro attacchi ripetitivi e disporre di tracciabilita per investigazioni.
  **Benefici**: Permette di rilevare precocemente pattern sospetti, facilita audit di sicurezza e abilita contromisure mirate (rate limiting, alerting).
- **Data**: 2025-10-24 — **Giorno di sviluppo**: Day 4
- **Decisione**: Abilitare la Row-Level Security (RLS) sulle tabelle `accounts`, `transactions`, `otp_audits` e `security_logs` applicando policy basate su `app.current_user_id`.
  **Motivo**: Vincolare in modo nativo su PostgreSQL la visibilita e l'inserimento dei dati multi-tenant al solo proprietario logico, preparando l'integrazione con Keycloak/OIDC.
  **Benefici**: Riduce il rischio di data leakage tra clienti, crea un controllo coerente per conti/transazioni/audit di sicurezza e rende verificabile l'isolamento a livello database.

## Trasferimenti
- **Data**: 2025-10-20 — **Giorno di sviluppo**: Day 1
- **Decisione**: Persistire l'idempotency key dei trasferimenti nel database insieme ai metadati della richiesta.
  **Motivo**: Evitare la perdita di dati in caso di riavvio dei servizi o problemi di rete e conservare uno storico completo delle operazioni.
  **Benefici**: Garantisce idempotenza anche in scenari di fault, semplifica la riconciliazione e abilita analisi/audit sulle richieste ripetute.

## Presentazione dati
- **Data**: 2025-10-20 — **Giorno di sviluppo**: Day 1
- **Decisione**: Offrire filtri combinabili tra portafogli/servizi e tipo di transazione, con ordinamento per data e importo nelle liste conti e transazioni.
  **Motivo**: Allineare l'interfaccia alle esigenze degli utenti che gestiscono piu conti e servizi, facilitando l'analisi delle operazioni.
  **Benefici**: Migliora la velocita di consultazione, consente focalizzazioni rapide su subset rilevanti e aumenta la percezione di controllo per l'utente.

## Database
- **Data**: 2025-10-22 — **Giorno di sviluppo**: Day 3
- **Decisione**: Automatizzare l'applicazione delle migrazioni e il popolamento dei seed tramite il comando `python -m backend.db.manage {migrate|seed|bootstrap}`.
  **Motivo**: Ridurre errori manuali e garantire coerenza tra gli ambienti di sviluppo e test.
  **Benefici**: Avvio ambiente piu rapido, migrazioni idempotenti e integrazione semplificata in una futura pipeline CI/CD.

## Notifiche OTP
- **Data**: 2025-10-22 — **Giorno di sviluppo**: Day 3
- **Decisione**: Realizzare un microservizio interno per l'invio delle OTP via email e simulare gli SMS anziche dipendere da servizi esterni.
  **Motivo**: Avere controllo completo sui canali di consegna durante la fase prototipale e semplificare i test locali.
  **Benefici**: Nessun costo o latenza esterna, maggiore osservabilita del flusso OTP e facilita di estensione futura a canali reali.

## Qualita e Test
- **Data**: 2025-10-22 — **Giorno di sviluppo**: Day 3
- **Decisione**: Pianificare una sessione di collaudo end-to-end documentata in `docs/test-plan-saturday.md` per verificare backend, database e servizio OTP.
  **Motivo**: Consolidare lo stato attuale prima di introdurre nuove integrazioni (Keycloak, frontend) e raccogliere evidenze strutturate.
  **Benefici**: Visione chiara delle coperture, individuazione precoce di gap e base condivisa per i commit tematici dopo i test.
