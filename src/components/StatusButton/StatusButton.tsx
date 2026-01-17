import { Button } from '@mui/material';
import { statusConfig } from '../../utils/statusConfig';

interface StatusButtonProps {
  currentStatus: 0 | 1 | 2;
  onStatusChange: (newStatus: 0 | 1 | 2) => void;
}

export const StatusButton = ({ currentStatus, onStatusChange }: StatusButtonProps) => {
  const nextStatus = ((currentStatus + 1) % 3) as 0 | 1 | 2;
  const nextStatusConfig = statusConfig[nextStatus];

  return (
    <Button
      variant="contained"
      onClick={() => onStatusChange(nextStatus)}
      sx={{ 
        backgroundColor: nextStatusConfig.color,
        color: '#FFFFFF'
      }}
    >
      Перевести в "{nextStatusConfig.label}"
    </Button>
  );
};
