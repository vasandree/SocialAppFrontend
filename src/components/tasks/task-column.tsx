import { TaskCard, type TaskData } from './task-card';

interface TaskColumnProps {
  title: string;
  tasks: TaskData[];
  color: string;
  onTaskClick?: (task: TaskData) => void;
}

export const TaskColumn = ({ title, tasks, color, onTaskClick }: TaskColumnProps) => {
  return (
    <div className="flex-1 min-w-[250px]">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <h2 className="font-medium">{title}</h2>
      </div>
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onTaskClick ? () => onTaskClick(task) : undefined}
          />
        ))}
      </div>
    </div>
  );
};
