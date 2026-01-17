import { Typography, Box, Paper, CircularProgress } from '@mui/material';
import { TaskCard } from '../components/TaskCard/TaskCard';
import { useTaskData } from '../hooks/useTaskData';
import { statusConfig } from '../utils/statusConfig';

export const DashboardPage = () => {
  const { tasks, isLoading } = useTaskData();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        {statusConfig.map((status) => {
          const statusTasks = tasks.filter(task => task.status === status.id);
          
          return (
            <Box key={status.id} sx={{ flex: 1 }}>
              <Paper elevation={0} sx={{ p: 3, minHeight: '500px', backgroundColor: status.bgColor }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  {status.label}
                </Typography>
                <Box>
                  {statusTasks.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      Нет задач
                    </Typography>
                  ) : (
                    statusTasks.map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))
                  )}
                </Box>
              </Paper>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
