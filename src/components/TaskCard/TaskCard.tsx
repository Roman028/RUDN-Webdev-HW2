import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../../types';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <Card sx={{ mb: 1.5, cursor: 'pointer' }} onClick={handleClick}>
      <CardContent>
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', cursor: 'pointer' }} onClick={handleClick}>
          #{task.id}
        </Typography>
        <Typography variant="body1">
          {task.title}
        </Typography>
      </CardContent>
    </Card>
  );
};
