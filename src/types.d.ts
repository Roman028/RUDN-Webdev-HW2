export interface Task {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  status: 0 | 1 | 2;
}
