import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SportsMmaIcon from '@mui/icons-material/SportsMma';

export const HeaderComp = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <SportsMmaIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Доска задач
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button onClick={() => navigate('/board')} variant="outlined" color="inherit">
            Доска
          </Button>
          <Button onClick={() => navigate('/create')} variant="contained" color="secondary">
            Новая задача
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
