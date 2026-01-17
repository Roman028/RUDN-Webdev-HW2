import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { Task } from '../types';

interface JsonPlaceholderTodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const fetchTasksFromApi = async (): Promise<Task[]> => {
  const response = await axios.get<JsonPlaceholderTodo[]>('https://jsonplaceholder.typicode.com/todos');
  return response.data.map((item, index): Task => ({
    id: item.id,
    title: item.title,
    description: '',
    createdAt: new Date(Date.now() - index * 86400000),
    status: item.completed ? 2 : 0
  }));
};

export const useTaskData = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const apiTasks = await fetchTasksFromApi();
      const existingTasks = queryClient.getQueryData<Task[]>(['tasks']) || [];
      const userCreatedTasks = existingTasks.filter(task => task.id > 200);
      const existingApiTaskIds = new Set(apiTasks.map(t => t.id));
      const uniqueUserTasks = userCreatedTasks.filter(task => !existingApiTaskIds.has(task.id));
      return [...apiTasks, ...uniqueUserTasks];
    },
    structuralSharing: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
      const currentTasks = oldTasks || [];
      const maxId = currentTasks.length > 0 
        ? Math.max(...currentTasks.map(t => t.id), 200)
        : 200;
      
      const newTask: Task = {
        ...taskData,
        id: maxId + 1,
        createdAt: new Date(),
        status: 0
      };

      return [...currentTasks, newTask];
    });
  };

  const updateTask = (id: number, updatedFields: Partial<Task>) => {
    queryClient.setQueryData<Task[]>(['tasks'], (oldTasks = []) => {
      const updated = oldTasks.map(t => 
        t.id === id ? { ...t, ...updatedFields } : t
      );
      return updated;
    });
  };

  const deleteTask = (id: number) => {
    const existingTasks = queryClient.getQueryData<Task[]>(['tasks']) || [];
    const filtered = existingTasks.filter(t => t.id !== id);
    queryClient.setQueryData<Task[]>(['tasks'], filtered);
  };

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask
  };
};
