import { Box, Typography, Button, Paper, Divider, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskData } from '../hooks/useTaskData';
import { StatusButton } from '../components/StatusButton/StatusButton';
import { useEffect, useState } from 'react';
import { statusConfig } from '../utils/statusConfig';

export const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTaskData();
  const [task, setTask] = useState(tasks.find(t => t.id === Number(id)));

  useEffect(() => {
    const foundTask = tasks.find(t => t.id === Number(id));
    setTask(foundTask);
  }, [tasks, id]);

  if (!task) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Задача не найдена</Alert>
      </Box>
    );
  }

  const handleStatusChange = (newStatus: 0 | 1 | 2) => {
    updateTask(task.id, { status: newStatus });
    setTask({ ...task, status: newStatus });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/board');
  };

  const currentStatus = statusConfig[task.status];

  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={0} sx={{ p: 4, maxWidth: 800, width: '100%', backgroundColor: currentStatus.bgColor }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Задача #{task.id}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Название
            </Typography>
            <Typography variant="h6">{task.title}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Описание
            </Typography>
            <Typography variant="body1">
              {task.description || 'Описание отсутствует'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Дата создания
            </Typography>
            <Typography variant="body1">
              {new Date(task.createdAt).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Статус
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {currentStatus.label}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <StatusButton
            currentStatus={task.status}
            onStatusChange={handleStatusChange}
          />
          <Button variant="outlined" onClick={handleDelete}>
            Удалить задачу
          </Button>
          <Button variant="outlined" onClick={() => navigate('/board')}>
            Вернуться к доске
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
