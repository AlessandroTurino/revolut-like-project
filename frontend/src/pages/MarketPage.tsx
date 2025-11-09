import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

const mockMarket = [
  { name: 'NovaCoin', ticker: 'NVC', price: 125.4, change: +3.4 },
  { name: 'ItaloToken', ticker: 'ITT', price: 0.094, change: -1.2 },
  { name: 'EuroChain', ticker: 'EURX', price: 2.87, change: +0.8 },
  { name: 'LumenGold', ticker: 'LUM', price: 48.2, change: +5.1 },
  { name: 'MareNero', ticker: 'MNRO', price: 0.56, change: -0.4 },
]

const formatPrice = (value: number) =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value)

export function MarketPage() {
  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="overline" color="text.secondary">
              Navigazione
            </Typography>
            <Typography variant="h3" fontWeight={700}>
              Market
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Lista fittizia di criptovalute per simulare l’area market della piattaforma.
            </Typography>
          </div>

          <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Criptovalute disponibili</Typography>
                <Chip label={`${mockMarket.length} asset`} color="primary" size="small" />
              </Stack>
              <Divider />
              <List disablePadding>
                {mockMarket.map((asset, index) => (
                  <ListItem
                    key={asset.ticker}
                    disableGutters
                    sx={{
                      py: 1.25,
                      borderBottom:
                        index === mockMarket.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Typography variant="subtitle1" fontWeight={600}>
                            {asset.name}
                          </Typography>
                          <Chip label={asset.ticker} size="small" color="secondary" />
                        </Stack>
                      }
                      secondary={
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                          <Typography variant="body2" color="text.primary">
                            Prezzo: {formatPrice(asset.price)}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={asset.change >= 0 ? 'success.main' : 'error.main'}
                            fontWeight={600}
                          >
                            {asset.change >= 0 ? '+' : ''}
                            {asset.change.toFixed(2)}%
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  )
}

