import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useApiClient } from '@/api/useApiClient'

export type Account = {
  id: string
  name: string
  currency: string
  balance: number
  createdAt: string
}

export type Transaction = {
  id: string
  accountId: string
  amount: number
  currency: string
  category: string | null
  direction: 'buy' | 'sell'
  createdAt: string
}

export type CryptoPosition = {
  id: string
  ticker: string
  name: string
  amount: number
  eurValue: number
  change24hPercent: number | null
  iconUrl: string | null
  priceSource: string | null
  network: string | null
  accountId: string | null
  syncedAt: string | null
  createdAt: string
  updatedAt: string
}

type AccountListResponse = {
  data: Array<{
    id: string
    user_id: string
    currency: string
    balance: string
    name: string
    created_at: string
  }>
}

type TransactionListResponse = {
  data: Array<{
    id: string
    user_id: string
    account_id: string
    amount: string
    currency: string
    category: string | null
    idem_key: string
    direction: 'buy' | 'sell'
    created_at: string
  }>
}

type CryptoPositionResponse = {
  data: Array<{
    id: string
    ticker: string
    name: string
    amount: string
    eur_value: string
    change_24h_percent: string | null
    icon_url: string | null
    price_source: string | null
    network: string | null
    account_id: string | null
    synced_at: string | null
    created_at: string
    updated_at: string
  }>
  total_eur_value: string
}

const accountsKey = ['accounts']
const transactionsKey = ['transactions']
const cryptoPositionsKey = ['crypto-positions']

function parseCurrencyAmount(value: string): number {
  const numeric = Number(value)
  if (Number.isNaN(numeric)) {
    return 0
  }
  return numeric
}

export function useAccountsQuery(
  options?: Partial<UseQueryOptions<Account[], Error>> & { enabled?: boolean },
) {
  const apiClient = useApiClient()
  const { enabled = true, ...queryOptions } = options ?? {}

  return useQuery<Account[], Error>({
    queryKey: accountsKey,
    enabled,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    ...queryOptions,
    queryFn: async () => {
      const response = await apiClient.request<AccountListResponse>({
        path: '/accounts',
      })
      return response.data.map((account) => ({
        id: account.id,
        name: account.name,
        currency: account.currency,
        balance: parseCurrencyAmount(account.balance),
        createdAt: account.created_at,
      }))
    },
  })
}

export function useTransactionsQuery(
  options?: Partial<UseQueryOptions<Transaction[], Error>> & {
    enabled?: boolean
    take?: number
  },
) {
  const apiClient = useApiClient()
  const { enabled = true, take, select, ...queryOptions } = options ?? {}

  return useQuery<Transaction[], Error>({
    queryKey: transactionsKey,
    enabled,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    ...queryOptions,
    select:
      select ??
      ((transactions: Transaction[]) => {
        if (take != null) {
          return transactions.slice(0, take)
        }
        return transactions
      }),
    queryFn: async () => {
      const response = await apiClient.request<TransactionListResponse>({
        path: '/transactions',
      })
      return response.data.map((transaction) => ({
        id: transaction.id,
        accountId: transaction.account_id,
        amount: parseCurrencyAmount(transaction.amount),
        currency: transaction.currency,
        category: transaction.category,
        direction: transaction.direction,
        createdAt: transaction.created_at,
      }))
    },
  })
}

export const useAccountSummary = (accounts: Account[] | undefined) =>
  useMemo(() => {
    if (!accounts || accounts.length === 0) {
      return { totalBalance: 0, currency: undefined as string | undefined }
    }
    // assume same currency for summary (first account)
    const currency = accounts[0]?.currency
    const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0)
    return { totalBalance, currency }
  }, [accounts])

export function useCryptoPositionsQuery(
  options?: Partial<UseQueryOptions<{ positions: CryptoPosition[]; totalValue: number }, Error>> & {
    enabled?: boolean
  },
) {
  const apiClient = useApiClient()
  const { enabled = true, ...queryOptions } = options ?? {}

  return useQuery<{ positions: CryptoPosition[]; totalValue: number }, Error>({
    queryKey: cryptoPositionsKey,
    enabled,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    ...queryOptions,
    queryFn: async () => {
      const response = await apiClient.request<CryptoPositionResponse>({
        path: '/crypto-positions',
      })
      const positions = response.data.map((item) => ({
        id: item.id,
        ticker: item.ticker,
        name: item.name,
        amount: parseCurrencyAmount(item.amount),
        eurValue: parseCurrencyAmount(item.eur_value),
        change24hPercent: item.change_24h_percent != null ? Number(item.change_24h_percent) : null,
        iconUrl: item.icon_url,
        priceSource: item.price_source,
        network: item.network,
        accountId: item.account_id,
        syncedAt: item.synced_at,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }))
      return {
        positions,
        totalValue: parseCurrencyAmount(response.total_eur_value),
      }
    },
  })
}
