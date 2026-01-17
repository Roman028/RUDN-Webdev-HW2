import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useTaskData } from '../hooks/useTaskData';
import { useNavigate } from 'react-router-dom';

export const CreateTaskPage = () => {
  const { addTask } = useTaskData();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);

  const handleCreate = () => {
    if (title.trim() === '') {
      setTitleError(true);
      return;
    }

    addTask({
      title: title.trim(),
      description: description.trim() || undefined
    });

    navigate('/board');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={0} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Создание новой задачи
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Название задачи"
            value={title}
            onChange={handleTitleChange}
            error={titleError}
            helperText={titleError ? 'Название задачи обязательно' : ''}
            required
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => navigate('/board')}>
              Отмена
            </Button>
            <Button variant="contained" onClick={handleCreate} disabled={title.trim() === ''}>
              Создать
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
