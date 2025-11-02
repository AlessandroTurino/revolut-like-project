"""Router package per esporre gli endpoint pubblici dell'applicazione."""

from .accounts import router as accounts_router
from .otp import router as otp_router
from .transactions import router as transactions_router

__all__ = ["accounts_router", "transactions_router", "otp_router"]
