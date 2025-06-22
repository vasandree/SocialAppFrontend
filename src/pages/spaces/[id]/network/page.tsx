import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { PageLayout } from '@/components/layout/page-layout.tsx';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { useNavigate } from 'react-router-dom';

interface Node {
  id: string;
  type: 'person' | 'organization';
  name: string;
  notifications?: number;
  tasks?: number;
}

interface Connection {
  source: string;
  target: string;
  label: string;
  labelColor: string;
}

export const NetworkView = ({ params }: { params: { id: string } }) => {
  const router = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useMobile();
  const [activeTab, setActiveTab] = useState('workspace');

  // Sample data
  const nodes: Node[] = [
    { id: 'tgu', type: 'organization', name: 'ТГУ' },
    { id: 'andrey', type: 'person', name: 'Андрей ', notifications: 2, tasks: 3 },
    { id: 'roman ', type: 'person', name: 'Рома', notifications: 1, tasks: 2 },
  ];

  const connections: Connection[] = [
    { source: 'tgu', target: 'andrey', label: 'Студент', labelColor: '#a3e635' },
    { source: 'tgu', target: 'roman', label: 'Выпускник', labelColor: '#5eead4' },
    { source: 'roman', target: 'andrey', label: 'Научный руководитель', labelColor: '#fda4af' },
    { source: 'tgu', target: 'roman', label: 'Преподаватель', labelColor: '#fbbf24' },
    { source: 'andrey', target: 'roman', label: 'Друг', labelColor: '#fbbf24' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const positions = {
      tgu: { x: canvas.width / 2, y: canvas.height / 3 },
      andrey: { x: (canvas.width / 4) * 3, y: canvas.height / 2 },
      danila: { x: canvas.width / 2, y: (canvas.height / 4) * 3 },
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    connections.forEach((connection) => {
      const source = positions[connection.source as keyof typeof positions];
      const target = positions[connection.target as keyof typeof positions];

      if (!source || !target) return;

      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 1;
      ctx.stroke();

      const midX = (source.x + target.x) / 2;
      const midY = (source.y + target.y) / 2;

      ctx.fillStyle = connection.labelColor;
      const labelWidth = ctx.measureText(connection.label).width + 20;
      const labelHeight = 24;
      ctx.beginPath();
      ctx.roundRect(midX - labelWidth / 2, midY - labelHeight / 2, labelWidth, labelHeight, 12);
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(connection.label, midX, midY);

      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(midX, midY - 30, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    nodes.forEach((node) => {
      const position = positions[node.id as keyof typeof positions];
      if (!position) return;

      if (node.type === 'organization') {
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(position.x, position.y - 30);
        ctx.lineTo(position.x + 30, position.y);
        ctx.lineTo(position.x + 30, position.y + 30);
        ctx.lineTo(position.x - 30, position.y + 30);
        ctx.lineTo(position.x - 30, position.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Roof
        ctx.beginPath();
        ctx.moveTo(position.x - 30, position.y);
        ctx.lineTo(position.x, position.y - 30);
        ctx.lineTo(position.x + 30, position.y);
        ctx.stroke();

        // Door
        ctx.beginPath();
        ctx.rect(position.x - 10, position.y + 10, 20, 20);
        ctx.stroke();
      } else {
        // Draw person as circle with avatar
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(position.x, position.y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw person icon
        ctx.beginPath();
        ctx.arc(position.x, position.y - 10, 10, 0, Math.PI * 2);
        ctx.moveTo(position.x - 15, position.y + 20);
        ctx.bezierCurveTo(position.x - 15, position.y, position.x + 15, position.y, position.x + 15, position.y + 20);
        ctx.stroke();

        // Draw notification badge if any
        if (node.notifications) {
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(position.x + 20, position.y - 20, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = '10px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.notifications.toString(), position.x + 20, position.y - 20);
        }

        // Draw task badge if any
        if (node.tasks) {
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(position.x + 20, position.y - 5, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = '10px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.tasks.toString(), position.x + 20, position.y - 5);
        }
      }

      // Draw node name
      ctx.fillStyle = '#000000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Split name into lines if needed
      const nameParts = node.name.split(' ');
      if (nameParts.length > 1) {
        ctx.fillText(nameParts[0], position.x, position.y + 50);
        ctx.fillText(nameParts[1], position.x, position.y + 70);
      } else {
        ctx.fillText(node.name, position.x, position.y + 60);
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <PageLayout currentPage="spaces">
      <div className="flex flex-col h-full">
        <div className="border-b">
          <div className="flex items-center p-4">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4"
              onClick={() => router(`/spaces/${params.id}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <nav className="flex space-x-6">
              <button
                className={`px-4 py-2 ${
                  activeTab === 'workspace'
                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('workspace')}
              >
                Пространство
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === 'tasks' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('tasks')}
              >
                Задачи
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === 'events' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('events')}
              >
                События
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === 'people' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('people')}
              >
                Люди
              </button>
            </nav>
          </div>
        </div>

        <div className="flex-1 relative">
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
          />
        </div>

        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-md p-2">
          <div className="flex flex-col space-y-2">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5L12 19"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12L19 12"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#4F46E5"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="3"
                  stroke="#4F46E5"
                  strokeWidth="2"
                />
                <path
                  d="M6 20C6 16.6863 8.68629 14 12 14C15.3137 14 18 16.6863 18 20"
                  stroke="#4F46E5"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12H15V22"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
