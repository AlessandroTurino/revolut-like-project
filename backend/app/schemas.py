"""Modelli Pydantic utilizzati per serializzare request e response dell'API."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, Field


class AccountOut(BaseModel):
    """Rappresenta un conto appartenente all'utente corrente."""

    id: UUID = Field(..., description="Identificativo univoco del conto")
    user_id: UUID = Field(..., description="Identificativo dell'utente proprietario")
    currency: str = Field(..., min_length=3, max_length=3, description="Codice valuta ISO 4217")
    balance: Decimal = Field(..., description="Saldo corrente del conto")
    name: str = Field(..., description="Nome mnemonico del conto")
    created_at: datetime = Field(..., description="Istante di creazione del conto")


class AccountListResponse(BaseModel):
    """Payload di risposta contenente la collezione di conti."""

    data: List[AccountOut]


class TransactionOut(BaseModel):
    """Rappresenta una transazione legata a un conto dell'utente."""

    id: UUID = Field(..., description="Identificativo univoco della transazione")
    user_id: UUID = Field(..., description="Identificativo dell'utente proprietario")
    account_id: UUID = Field(..., description="Identificativo del conto coinvolto")
    amount: Decimal = Field(..., description="Importo movimentato dalla transazione")
    currency: str = Field(..., min_length=3, max_length=3, description="Valuta dell'operazione")
    category: Optional[str] = Field(None, description="Categoria opzionale assegnata alla transazione")
    idem_key: str = Field(..., description="Chiave di idempotenza utilizzata per evitare duplicati")
    direction: str = Field(..., description="Direzione della transazione (buy/sell)")
    created_at: datetime = Field(..., description="Istante di creazione della transazione")


class TransactionListResponse(BaseModel):
    """Payload di risposta con una lista di transazioni."""

    data: List[TransactionOut]


class TransactionCreate(BaseModel):
    """Modello di input per la creazione di una nuova transazione simulata."""

    account_id: UUID = Field(..., description="Identificativo del conto interessato")
    amount: Decimal = Field(..., gt=Decimal("0"), description="Importo positivo della transazione")
    currency: str = Field(..., min_length=3, max_length=3, description="Valuta dell'operazione")
    category: Optional[str] = Field(None, max_length=100, description="Categoria opzionale assegnata dall'utente")
    direction: str = Field(..., pattern="^(buy|sell)$", description="Direzione della transazione")
    idem_key: str = Field(..., min_length=1, description="Chiave di idempotenza fornita dal client")


class TransactionResponse(BaseModel):
    """Payload di risposta per singole operazioni sulle transazioni."""

    data: TransactionOut


class OtpSendRequest(BaseModel):
    """Richiesta per l'invio di una OTP."""

    channel_code: Optional[str] = Field(
        default=None, description="Codice canale OTP (es. EMAIL, SMS)."
    )
    destination: Optional[str] = Field(
        default=None, description="Destinazione alternativa (email o numero SMS)."
    )
    metadata: Optional[dict[str, str]] = Field(
        default=None, description="Metadati opzionali inoltrati al servizio OTP."
    )


class OtpSendResponse(BaseModel):
    """Risposta generata dopo aver inviato una OTP."""

    status: str = Field(..., description="Esito dell'invio (es. sent)")
    channel_code: str = Field(..., description="Canale utilizzato per l'invio")
    expires_at: datetime = Field(..., description="Istante di scadenza della OTP")