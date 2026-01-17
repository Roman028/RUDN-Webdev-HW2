import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { HeaderComp } from './components/HeaderComp/HeaderComp';
import { DashboardPage } from './pages/DashboardPage';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { TaskDetailPage } from './pages/TaskDetailPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#DC143C',
      light: '#FF1744',
      dark: '#B71C1C'
    },
    secondary: {
      main: '#1A1A1A',
      light: '#424242',
      dark: '#000000'
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF'
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20'
    },
    warning: {
      main: '#F57C00',
      light: '#FF9800',
      dark: '#E65100'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Arial Black", "Impact", sans-serif',
    h4: {
      fontWeight: 900,
      letterSpacing: '0.05em',
      textTransform: 'uppercase'
    },
    h5: {
      fontWeight: 800,
      letterSpacing: '0.03em',
      textTransform: 'uppercase'
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '0.02em'
    }
  },
  shape: {
    borderRadius: 0
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 700
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <HeaderComp />
          <Routes>
            <Route path="/" element={<Navigate to="/board" replace />} />
            <Route path="/board" element={<DashboardPage />} />
            <Route path="/create" element={<CreateTaskPage />} />
            <Route path="/task/:id" element={<TaskDetailPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
