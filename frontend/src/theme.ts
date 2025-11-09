import { extendTheme, type CssVarsThemeOptions } from '@mui/material/styles'

const themeOptions: CssVarsThemeOptions = {
  defaultColorScheme: 'light',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1b6ef3',
        },
        secondary: {
          main: '#ff7849',
        },
        background: {
          default: '#f5f6fb',
          paper: '#ffffff',
        },
        text: {
          primary: '#101828',
          secondary: '#475467',
        },
        divider: 'rgba(15, 23, 42, 0.12)',
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#8ab4ff',
        },
        secondary: {
          main: '#ffb68d',
        },
        background: {
          default: '#0f172a',
          paper: '#1f2937',
        },
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5f5',
        },
        divider: 'rgba(148, 163, 184, 0.24)',
      },
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: "'Roboto', 'Inter', 'Segoe UI', sans-serif",
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgba(15, 23, 42, 0.08)',
          boxShadow: '0px 24px 48px -28px rgba(15, 23, 42, 0.55)',
        },
      },
      defaultProps: {
        elevation: 0,
        variant: 'outlined',
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },
  },
}

export const theme = extendTheme(themeOptions)
