"""Endpoint REST dedicati alla gestione dei conti utente."""

from __future__ import annotations

from fastapi import APIRouter, Depends, status
from psycopg import AsyncConnection

from ..dependencies import get_current_user_id
from ..db import get_connection_with_rls
from ..schemas import AccountListResponse, AccountOut

router = APIRouter(prefix="/accounts", tags=["Accounts"])


@router.get(
    "",
    response_model=AccountListResponse,
    status_code=status.HTTP_200_OK,
)
async def list_accounts(
    conn: AsyncConnection = Depends(get_connection_with_rls),
    user_id: str = Depends(get_current_user_id),
) -> AccountListResponse:
    """
    Restituisce l'elenco dei conti associati all'utente autenticato.

    Argomenti:
        conn: Connessione asincrona al database ottenuta dal pool condiviso.
        user_id: Identificativo dell'utente corrente risolto dalle dipendenze.

    Restituisce:
        AccountListResponse: Payload con la collezione di conti ordinati per data di creazione.
    """
    query = """
        SELECT id, user_id, currency, balance, name, created_at
        FROM accounts
        WHERE user_id = %s
        ORDER BY created_at ASC;
    """
    async with conn.cursor() as cur:
        await cur.execute(query, (user_id,))
        rows = await cur.fetchall()
    accounts = [AccountOut(**dict(row)) for row in rows]
    return AccountListResponse(data=accounts)
