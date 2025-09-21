import { useState } from 'react';
import * as React from 'react';

import { useMobile } from '@/hooks/use-mobile';
import { TaskData } from '@/pages';
import { TaskCard } from '@/components/tasks/task-card.tsx';
import { StatusOfTask } from '@/utils/api';

interface TaskColumnProps {
  title: string;
  tasks: TaskData[];
  color: string;
  status: StatusOfTask;
  onTaskClick?: (task: TaskData) => void;
  onTaskMove?: (taskId: string, newStatus: StatusOfTask) => void;
}

export const TaskColumn = ({ title, tasks, color, status, onTaskClick, onTaskMove }: TaskColumnProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggingTask, setDraggingTask] = useState<TaskData | null>(null);
  const isMobile = useMobile();

  const handleDragOver = (e: React.DragEvent) => {
    if (isMobile) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (isMobile) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isMobile) return;
    e.preventDefault();
    setIsDragOver(false);

    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId && onTaskMove) {
      onTaskMove(taskId, status);
    }
    setDraggingTask(null);
  };

  const handleTaskDragStart = (task: TaskData) => {
    if (isMobile) return;
    setDraggingTask(task);
  };

  const handleTaskDragEnd = () => {
    if (isMobile) return;
    setDraggingTask(null);
    setIsDragOver(false);
  };

  return (
    <div
      className={`flex-1 min-w-[250px] ${isDragOver && !isMobile ? 'bg-accent/20 border-2 border-dashed border-primary' : ''} rounded-lg p-2 transition-all duration-200`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-column={status}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <h2 className="font-medium">{title}</h2>
        <span className="text-sm text-muted-foreground">({tasks.length})</span>
      </div>

      {isDragOver && !isMobile && (
        <div className="mb-4 p-4 border-2 border-dashed border-primary rounded-lg bg-primary/5 text-center text-sm text-primary">
          Отпустите, чтобы переместить задачу
        </div>
      )}

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onTaskClick ? () => onTaskClick(task) : undefined}
            onDragStart={handleTaskDragStart}
            onDragEnd={handleTaskDragEnd}
            isDragging={draggingTask?.id === task.id}
          />
        ))}

        {tasks.length === 0 && !isDragOver && (
          <div className="p-8 text-center text-muted-foreground text-sm border-2 border-dashed border-muted rounded-lg">
            Нет задач
          </div>
        )}
      </div>
    </div>
  );
};
