import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  User,
  Home,
  X,
  Plus,
  Minus,
  MousePointer2,
  Link2,
  TypeIcon,
} from 'lucide-react';
import { useNavigation } from 'react-router-dom';

import { Button } from '@/components/ui/button.tsx';
import { PageLayout } from '@/components/layout/page-layout.tsx';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog.tsx';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { useToast } from '@/components/ui/use-toast.ts';

interface WhiteboardElement {
  id: string;
  type: 'person' | 'organization' | 'text' | 'connection';
  x: number;
  y: number;
  width?: number;
  height?: number;
  content?: string;
  color?: string;
  notifications?: number;
  tasks?: number;
  connections?: { to: string; label?: string; labelColor?: string }[];
}

interface ConnectionInProgress {
  fromId: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

const initialElements: WhiteboardElement[] = [
  {
    id: 'tgu',
    type: 'organization',
    x: 500,
    y: 150,
    content: 'ТГУ',
  },
  {
    id: 'andrey',
    type: 'person',
    x: 800,
    y: 300,
    content: 'Andrew',
    notifications: 2,
    tasks: 3,
    connections: [
      { to: 'tgu', label: 'Студент', labelColor: '#a3e635' },
      { to: 'tgu', label: 'Ассистент', labelColor: '#fbbf24' },
    ],
  },
  {
    id: 'danila',
    type: 'person',
    x: 500,
    y: 450,
    content: 'Denis',
    notifications: 1,
    tasks: 2,
    connections: [
      { to: 'tgu', label: 'Студент', labelColor: '#5eead4' },
      { to: 'andrey', label: 'Друг', labelColor: '#fda4af' },
    ],
  },
];

export const WhiteboardView = ({ params }: { params: { id: string } }) => {
  const router = useNavigation();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const zoomRef = useRef(zoom);
  const panRef = useRef(pan);

  const isPanningRef = useRef(false);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });

  const [activeTool, setActiveTool] = useState<string>('select');
  const [elements, setElements] = useState<WhiteboardElement[]>(initialElements);

  const draggingIdRef = useRef<string | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const [connectionInProgress, setConnectionInProgress] = useState<ConnectionInProgress | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'person' | 'organization' | 'connection' | 'text'>('person');
  const [dialogData, setDialogData] = useState({
    content: '',
    label: '',
    labelColor: '#a3e635',
  });
  const [connectionTarget, setConnectionTarget] = useState<string | null>(null);
  const { toast } = useToast();
  const [editingConnection, setEditingConnection] = useState<{
    elementId: string;
    connectionIndex: number;
    connection: { to: string; label?: string; labelColor?: string };
  } | null>(null);
  const [editingElement, setEditingElement] = useState<WhiteboardElement | null>(null);
  const [pendingElementPosition, setPendingElementPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    panRef.current = pan;
  }, [pan]);

  const screenToWorld = useCallback(
    (screenX: number, screenY: number) => {
      const canvasRect = canvasContainerRef.current?.getBoundingClientRect();
      if (!canvasRect) return { x: 0, y: 0 };
      return {
        x: (screenX - canvasRect.left - pan.x) / zoom,
        y: (screenY - canvasRect.top - pan.y) / zoom,
      };
    },
    [pan, zoom]
  );

  useEffect(() => {
    const canvas = canvasContainerRef.current;
    if (!canvas) return;

    if (elements.length === 0) {
      setZoom(1);
      setPan({ x: canvas.offsetWidth / 2, y: canvas.offsetHeight / 2 });
      return;
    }

    let minX = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY,
      minY = Number.POSITIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY;
    elements.forEach((el) => {
      const elWidth = el.type === 'text' ? (el.content?.length || 10) * 8 : 80;
      const elHeight = el.type === 'text' ? 30 : 100;
      minX = Math.min(minX, el.x - elWidth / 2);
      maxX = Math.max(maxX, el.x + elWidth / 2);
      minY = Math.min(minY, el.y - elHeight / 2);
      maxY = Math.max(maxY, el.y + elHeight / 2);
    });

    const worldWidth = maxX - minX;
    const worldHeight = maxY - minY;

    if (worldWidth <= 0 || worldHeight <= 0) {
      const firstElement = elements[0];
      const newZoom = isMobile ? 0.6 : 1.0;
      const newPanX = canvas.offsetWidth / 2 - firstElement.x * newZoom;
      const newPanY = canvas.offsetHeight / 2 - firstElement.y * newZoom;
      setZoom(newZoom);
      setPan({ x: newPanX, y: newPanY });
      return;
    }

    const padding = isMobile ? 30 : 60;
    const canvasWidth = Math.max(1, canvas.offsetWidth - 2 * padding);
    const canvasHeight = Math.max(1, canvas.offsetHeight - 2 * padding);

    const zoomX = canvasWidth / worldWidth;
    const zoomY = canvasHeight / worldHeight;
    let newZoom = Math.min(zoomX, zoomY);

    if (isMobile) {
      newZoom = Math.min(newZoom, 0.8);
    } else {
      newZoom = Math.min(newZoom, 1.2);
      newZoom = Math.max(newZoom, 0.5);
    }
    newZoom = Math.max(newZoom, 0.1);

    const worldCenterX = (minX + maxX) / 2;
    const worldCenterY = (minY + maxY) / 2;

    const newPanX = canvas.offsetWidth / 2 - worldCenterX * newZoom;
    const newPanY = canvas.offsetHeight / 2 - worldCenterY * newZoom;

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, elements.length]);

  const handleMouseDownOnElement = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    e.stopPropagation();

    if (activeTool === 'delete') {
      deleteElement(id);
      return;
    }

    const element = elements.find((el) => el.id === id);
    if (!element) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const worldMousePos = screenToWorld(clientX, clientY);

    if (activeTool === 'connect') {
      if ('touches' in e) e.preventDefault();
      setConnectionInProgress({
        fromId: id,
        fromX: element.x,
        fromY: element.y,
        toX: worldMousePos.x,
        toY: worldMousePos.y,
      });
      return;
    }

    if (activeTool === 'select') {
      if ('touches' in e) e.preventDefault();
      dragOffsetRef.current = {
        x: worldMousePos.x - element.x,
        y: worldMousePos.y - element.y,
      };
      draggingIdRef.current = id;
      setSelectedElement(id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    let eventClientX, eventClientY;
    let shouldPreventDefault = false;

    if ('touches' in e) {
      eventClientX = e.touches[0].clientX;
      eventClientY = e.touches[0].clientY;
      if (isPanningRef.current || draggingIdRef.current || connectionInProgress) {
        shouldPreventDefault = true;
      }
    } else {
      eventClientX = e.clientX;
      eventClientY = e.clientY;
    }

    if (shouldPreventDefault && 'preventDefault' in e) {
      e.preventDefault();
    }

    const worldMousePos = screenToWorld(eventClientX, eventClientY);

    if (isPanningRef.current) {
      const dx = eventClientX - lastMousePositionRef.current.x;
      const dy = eventClientY - lastMousePositionRef.current.y;
      setPan((prevPan) => ({ x: prevPan.x + dx, y: prevPan.y + dy }));
      lastMousePositionRef.current = { x: eventClientX, y: eventClientY };
    } else if (draggingIdRef.current && activeTool === 'select') {
      setElements((prev) =>
        prev.map((el) => {
          if (el.id === draggingIdRef.current) {
            return {
              ...el,
              x: worldMousePos.x - dragOffsetRef.current.x,
              y: worldMousePos.y - dragOffsetRef.current.y,
            };
          }
          return el;
        })
      );
    } else if (connectionInProgress) {
      setConnectionInProgress({
        ...connectionInProgress,
        toX: worldMousePos.x,
        toY: worldMousePos.y,
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent | React.TouchEvent) => {
    if (isPanningRef.current) {
      isPanningRef.current = false;
    }

    if (draggingIdRef.current) {
      draggingIdRef.current = null;
    }

    if (connectionInProgress) {
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const worldMouseUpPos = screenToWorld(clientX, clientY);

      const targetElement = elements.find((el) => {
        const distance = Math.sqrt(Math.pow(el.x - worldMouseUpPos.x, 2) + Math.pow(el.y - worldMouseUpPos.y, 2));
        return distance < 40 && el.id !== connectionInProgress.fromId;
      });

      if (targetElement) {
        setConnectionTarget(targetElement.id);
        setDialogType('connection');
        setDialogData({ content: '', label: '', labelColor: '#a3e635' });
        setIsDialogOpen(true);
      } else {
        setConnectionInProgress(null);
      }
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.target === canvasContainerRef.current?.firstChild && activeTool === 'select') {
      if ('touches' in e) e.preventDefault();
      isPanningRef.current = true;
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      lastMousePositionRef.current = { x: clientX, y: clientY };
    }
  };

  const handleCanvasClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.target !== canvasContainerRef.current?.firstChild) return;

    if (activeTool === 'person' || activeTool === 'organization' || activeTool === 'text') {
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const worldClickPos = screenToWorld(clientX, clientY);
      setPendingElementPosition({ x: worldClickPos.x, y: worldClickPos.y });
      setDialogType(activeTool as 'person' | 'organization' | 'text');
      setDialogData({ content: '', label: '', labelColor: '#a3e635' });
      setIsDialogOpen(true);
    }
    setSelectedElement(null);
  };

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const canvasRect = canvasContainerRef.current?.getBoundingClientRect();
      if (!canvasRect) return;

      const currentZoom = zoomRef.current;
      const currentPan = panRef.current;

      const zoomSpeed = 0.1;
      const newZoomAttempt = currentZoom - e.deltaY * zoomSpeed * 0.05;
      const newClampedZoom = Math.max(0.2, Math.min(newZoomAttempt, 3));

      const mouseX = e.clientX - canvasRect.left;
      const mouseY = e.clientY - canvasRect.top;

      const worldXBeforeZoom = (mouseX - currentPan.x) / currentZoom;
      const worldYBeforeZoom = (mouseY - currentPan.y) / currentZoom;

      const newPanX = mouseX - worldXBeforeZoom * newClampedZoom;
      const newPanY = mouseY - worldYBeforeZoom * newClampedZoom;

      setZoom(newClampedZoom);
      setPan({ x: newPanX, y: newPanY });
    },
    [setZoom, setPan]
  );

  useEffect(() => {
    const canvasEl = canvasContainerRef.current;
    if (canvasEl) {
      canvasEl.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        canvasEl.removeEventListener('wheel', handleWheel);
      };
    }
  }, [handleWheel]);

  const adjustPanForZoomButton = (newZoomLevel: number, oldZoomLevel: number) => {
    const canvas = canvasContainerRef.current;
    if (!canvas) return;

    const viewportCenterX = canvas.clientWidth / 2;
    const viewportCenterY = canvas.clientHeight / 2;

    const worldXAtViewportCenter = (viewportCenterX - pan.x) / oldZoomLevel;
    const worldYAtViewportCenter = (viewportCenterY - pan.y) / oldZoomLevel;

    const newPanX = viewportCenterX - worldXAtViewportCenter * newZoomLevel;
    const newPanY = viewportCenterY - worldYAtViewportCenter * newZoomLevel;

    setPan({ x: newPanX, y: newPanY });
  };

  const handleZoomIn = () => {
    const oldZoom = zoom;
    const newZoom = Math.min(oldZoom + 0.1, 3);
    if (newZoom !== oldZoom) {
      setZoom(newZoom);
      adjustPanForZoomButton(newZoom, oldZoom);
    }
  };

  const handleZoomOut = () => {
    const oldZoom = zoom;
    const newZoom = Math.max(oldZoom - 0.1, 0.2);
    if (newZoom !== oldZoom) {
      setZoom(newZoom);
      adjustPanForZoomButton(newZoom, oldZoom);
    }
  };

  const handleElementDoubleClick = (id: string) => {
    const element = elements.find((el) => el.id === id);
    if (element && (element.type === 'person' || element.type === 'organization' || element.type === 'text')) {
      setEditingElement(element);
      setDialogType(element.type);
      setDialogData({
        content: element.content || '',
        label: '',
        labelColor: '',
      });
      setIsDialogOpen(true);
    }
  };

  const addElement = (type: 'person' | 'organization' | 'text', content: string, x: number, y: number) => {
    const newElement: WhiteboardElement = {
      id: `element-${Date.now()}`,
      type,
      x,
      y,
      content,
      notifications: type === 'person' ? Math.floor(Math.random() * 3) : undefined,
      tasks: type === 'person' ? Math.floor(Math.random() * 5) : undefined,
    };
    setElements((prev) => [...prev, newElement]);
    toast({ title: 'Элемент добавлен', description: `${content} успешно добавлен на доску` });
  };

  const addConnection = (fromId: string, toId: string, label: string, labelColor: string) => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === fromId) {
          const connections = el.connections || [];
          return { ...el, connections: [...connections, { to: toId, label, labelColor }] };
        }
        return el;
      })
    );
    toast({ title: 'Связь создана', description: `Связь "${label}" успешно добавлена` });
  };

  const deleteElement = (id: string) => {
    setElements((prev) =>
      prev
        .map((el) => ({ ...el, connections: el.connections?.filter((conn) => conn.to !== id) }))
        .filter((el) => el.id !== id)
    );
    toast({ title: 'Элемент удален', description: 'Элемент успешно удален с доски' });
  };

  const handleConnectionEdit = (elementId: string, connectionIndex: number) => {
    const element = elements.find((el) => el.id === elementId);
    if (element?.connections?.[connectionIndex]) {
      setEditingConnection({ elementId, connectionIndex, connection: element.connections[connectionIndex] });
      setDialogType('connection');
      setDialogData({
        content: '',
        label: element.connections[connectionIndex].label || '',
        labelColor: element.connections[connectionIndex].labelColor || '#a3e635',
      });
      setIsDialogOpen(true);
    }
  };

  const handleConnectionDelete = (elementId: string, connectionIndex: number) => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === elementId && el.connections) {
          const newConnections = [...el.connections];
          newConnections.splice(connectionIndex, 1);
          return { ...el, connections: newConnections };
        }
        return el;
      })
    );
    toast({ title: 'Связь удалена', description: 'Связь успешно удалена' });
  };

  const handleDialogConfirm = () => {
    if (editingElement) {
      setElements((prev) =>
        prev.map((el) => (el.id === editingElement.id ? { ...el, content: dialogData.content || el.content } : el))
      );
      toast({ title: 'Элемент обновлен', description: `Элемент "${dialogData.content}" успешно обновлен.` });
      setEditingElement(null);
    } else if (dialogType === 'connection' && editingConnection) {
      setElements((prev) =>
        prev.map((el) => {
          if (el.id === editingConnection.elementId && el.connections) {
            const newConnections = [...el.connections];
            newConnections[editingConnection.connectionIndex] = {
              ...newConnections[editingConnection.connectionIndex],
              label: dialogData.label || 'Связь',
              labelColor: dialogData.labelColor,
            };
            return { ...el, connections: newConnections };
          }
          return el;
        })
      );
      setEditingConnection(null);
      toast({ title: 'Связь обновлена', description: 'Связь успешно обновлена' });
    } else if (dialogType === 'connection' && connectionInProgress && connectionTarget) {
      addConnection(connectionInProgress.fromId, connectionTarget, dialogData.label || 'Связь', dialogData.labelColor);
    } else if (['person', 'organization', 'text'].includes(dialogType) && pendingElementPosition) {
      addElement(
        dialogType as 'person' | 'organization' | 'text',
        dialogData.content ||
          (dialogType === 'person' ? 'Новый человек' : dialogType === 'organization' ? 'Новая организация' : 'Текст'),
        pendingElementPosition.x,
        pendingElementPosition.y
      );
    }
    setConnectionInProgress(null);
    setConnectionTarget(null);
    setPendingElementPosition(null);
    setIsDialogOpen(false);
    setActiveTool('select');
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
    setConnectionInProgress(null);
    setConnectionTarget(null);
    setEditingConnection(null);
    setEditingElement(null);
    setPendingElementPosition(null);
    setActiveTool('select');
  };

  const handleToolClick = (tool: string) => {
    setActiveTool(tool);
    if (tool === 'image') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files?.[0]) {
          setTimeout(
            () => toast({ title: 'Изображение загружено', description: 'Изображение успешно добавлено на доску' }),
            0
          );
        }
      };
      input.click();
    }
  };

  const DialogContent_Component = isMobile ? DrawerContent : DialogContent;
  const DialogHeader_Component = isMobile ? DrawerHeader : DialogHeader;
  const DialogTitle_Component = isMobile ? DrawerTitle : DialogTitle;
  const DialogFooter_Component = isMobile ? DrawerFooter : DialogFooter;

  return (
    <PageLayout currentPage="spaces">
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200">
          <div className="flex items-center p-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => router(`/spaces/${params.id}`)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm ml-2">Название</span>
          </div>
        </div>

        <div
          className="flex-1 relative overflow-hidden bg-background cursor-grab active:cursor-grabbing"
          ref={canvasContainerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseDown={handleCanvasMouseDown}
          onTouchStart={handleCanvasMouseDown}
          onClick={handleCanvasClick}
          onTouchEnd={(e) => {
            handleMouseUp(e);
            if (activeTool !== 'select' && activeTool !== 'connect' && activeTool !== 'delete') {
              handleCanvasClick(e);
            }
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
              width: '100%',
              height: '100%',
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ overflow: 'visible' }}
            >
              <defs className="text-border">
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                  fill="currentColor"
                >
                  <polygon points="0 0, 10 3.5, 0 7" />
                </marker>
              </defs>
              {elements.map((element) =>
                (element.connections || []).map((connection, idx) => {
                  const target = elements.find((el) => el.id === connection.to);
                  if (!target) return null;

                  const startX = element.x;
                  const startY = element.y;
                  const endX = target.x;
                  const endY = target.y;

                  const sameDirectionConnections = element.connections?.filter((c) => c.to === target.id) || [];
                  const count = sameDirectionConnections.length;
                  const index = sameDirectionConnections.indexOf(connection);

                  let pathData, labelX, labelY;
                  const midX = (startX + endX) / 2;
                  const midY = (startY + endY) / 2;

                  if (count > 1) {
                    const curvature = (index - (count - 1) / 2) * 0.3;
                    const dx = endX - startX;
                    const dy = endY - startY;
                    const controlX = midX - dy * curvature;
                    const controlY = midY + dx * curvature;
                    pathData = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
                    labelX = controlX;
                    labelY = controlY;
                  } else {
                    pathData = `M ${startX},${startY} L ${endX},${endY}`;
                    labelX = midX;
                    labelY = midY;
                  }

                  const labelText = connection.label || '';
                  const approxCharWidth = 7;
                  const paddingX = 10;
                  const textWidth = labelText.length * approxCharWidth;
                  const rectWidth = textWidth + 2 * paddingX;
                  const rectHeight = 24;

                  return (
                    <g key={`${element.id}-${connection.to}-${idx}`}>
                      <path
                        d={pathData}
                        stroke="currentColor"
                        className="text-border"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                      {connection.label && (
                        <>
                          <rect
                            x={labelX - rectWidth / 2}
                            y={labelY - rectHeight / 2}
                            width={rectWidth}
                            height={rectHeight}
                            rx="12"
                            ry="12"
                            fill={connection.labelColor || '#e5e7eb'}
                            style={{ cursor: 'pointer', pointerEvents: 'all' }}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (window.confirm('Выберите действие:\nОК - Редактировать\nОтмена - Удалить')) {
                                handleConnectionEdit(element.id, idx);
                              } else {
                                handleConnectionDelete(element.id, idx);
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConnectionEdit(element.id, idx);
                            }}
                          />
                          <text
                            x={labelX}
                            y={labelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#000000"
                            fontSize="12px"
                            style={{ pointerEvents: 'none' }}
                          >
                            {connection.label}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })
              )}
              {connectionInProgress && (
                <line
                  x1={connectionInProgress.fromX}
                  y1={connectionInProgress.fromY}
                  x2={connectionInProgress.toX}
                  y2={connectionInProgress.toY}
                  stroke="currentColor"
                  className="text-primary"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  markerEnd="url(#arrowhead)"
                />
              )}
            </svg>

            {elements.map((element) => {
              const isSelected = selectedElement === element.id;
              const baseClasses = 'absolute flex flex-col items-center cursor-move transition-all duration-100';
              const selectedClasses = isSelected ? 'z-10 ring-2 ring-primary ring-offset-2' : 'border-gray-300';

              if (element.type === 'person') {
                return (
                  <div
                    key={element.id}
                    className={`${baseClasses} ${selectedClasses} p-1 rounded-full`}
                    style={{ left: `${element.x}px`, top: `${element.y}px`, transform: 'translate(-50%, -50%)' }}
                    onMouseDown={(e) => handleMouseDownOnElement(e, element.id)}
                    onTouchStart={(e) => {
                      if ('touches' in e) e.preventDefault();
                      handleMouseDownOnElement(e, element.id);
                    }}
                    onDoubleClick={() => handleElementDoubleClick(element.id)}
                  >
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-full bg-background border-2 ${isSelected ? 'border-primary' : 'border-border'} flex items-center justify-center`}
                      >
                        <User className="h-7 w-7 text-primary" />
                      </div>
                      {element.notifications && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                          {element.notifications}
                        </div>
                      )}
                      {element.tasks && element.notifications && (
                        <div className="absolute top-4 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                          {element.tasks}
                        </div>
                      )}
                    </div>
                    <div className="mt-1 text-center font-medium text-xs whitespace-nowrap text-foreground">
                      {element.content?.split(' ').map((part, i) => <div key={i}>{part}</div>)}
                    </div>
                  </div>
                );
              } else if (element.type === 'organization') {
                return (
                  <div
                    key={element.id}
                    className={`${baseClasses} ${selectedClasses} p-1 rounded-md`}
                    style={{ left: `${element.x}px`, top: `${element.y}px`, transform: 'translate(-50%, -50%)' }}
                    onMouseDown={(e) => handleMouseDownOnElement(e, element.id)}
                    onTouchStart={(e) => {
                      if ('touches' in e) e.preventDefault();
                      handleMouseDownOnElement(e, element.id);
                    }}
                    onDoubleClick={() => handleElementDoubleClick(element.id)}
                  >
                    <div
                      className={`w-12 h-12 bg-background border-2 ${isSelected ? 'border-primary' : 'border-border'} rounded-md flex items-center justify-center`}
                    >
                      <Home className="h-7 w-7 text-primary" />
                    </div>
                    <div className="mt-1 text-center font-medium text-xs whitespace-nowrap text-foreground">
                      {element.content}
                    </div>
                  </div>
                );
              } else if (element.type === 'text') {
                return (
                  <div
                    key={element.id}
                    className={`absolute p-2 cursor-move ${isSelected ? 'z-10 bg-accent rounded ring-2 ring-primary' : ''}`}
                    style={{ left: `${element.x}px`, top: `${element.y}px`, transform: 'translate(-50%, -50%)' }}
                    onMouseDown={(e) => handleMouseDownOnElement(e, element.id)}
                    onTouchStart={(e) => {
                      if ('touches' in e) e.preventDefault();
                      handleMouseDownOnElement(e, element.id);
                    }}
                    onDoubleClick={() => handleElementDoubleClick(element.id)}
                  >
                    <div className="text-center font-medium text-sm text-foreground">{element.content}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {isMobile && (
            <>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-20">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-full bg-background shadow-md"
                  onClick={() => router(`/spaces/${params.id}`)}
                >
                  <Briefcase className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-full bg-background shadow-md"
                  onClick={() => router('/events')}
                >
                  <Calendar className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-full bg-background shadow-md"
                  onClick={() => router('/people')}
                >
                  <User className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-20">
                <Button
                  variant={activeTool === 'person' ? 'default' : 'outline'}
                  size="icon"
                  className="h-14 w-14 rounded-full bg-background shadow-md"
                  onClick={() => handleToolClick('person')}
                >
                  <User className="h-6 w-6" />
                </Button>
                <Button
                  variant={activeTool === 'organization' ? 'default' : 'outline'}
                  size="icon"
                  className="h-14 w-14 rounded-full bg-background shadow-md"
                  onClick={() => handleToolClick('organization')}
                >
                  <Home className="h-6 w-6" />
                </Button>
                <Button
                  variant={activeTool === 'connect' ? 'default' : 'outline'}
                  size="icon"
                  className="h-14 w-14 rounded-full bg-background shadow-md"
                  onClick={() => handleToolClick('connect')}
                >
                  <Link2 className="h-6 w-6" />
                </Button>
                <Button
                  variant={activeTool === 'delete' ? 'default' : 'outline'}
                  size="icon"
                  className="h-14 w-14 rounded-full bg-background shadow-md"
                  onClick={() => handleToolClick('delete')}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </>
          )}

          {!isMobile && (
            <>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background rounded-lg shadow-md p-2 z-20">
                <div className="flex flex-col space-y-2">
                  <Button
                    variant={activeTool === 'select' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleToolClick('select')}
                  >
                    <MousePointer2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={activeTool === 'person' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleToolClick('person')}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={activeTool === 'organization' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleToolClick('organization')}
                  >
                    <Home className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={activeTool === 'connect' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleToolClick('connect')}
                  >
                    <Link2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={activeTool === 'text' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleToolClick('text')}
                  >
                    <TypeIcon className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={activeTool === 'delete' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleToolClick('delete')}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="absolute right-4 bottom-4 flex items-center bg-background rounded-lg shadow-md p-2 z-20">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomOut}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2 text-sm">{Math.round(zoom * 100)}%</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomIn}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {isMobile ? (
        <Drawer
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <DialogContent_Component>
            <DialogHeader_Component>
              <DialogTitle_Component>
                {editingElement
                  ? 'Редактировать элемент'
                  : editingConnection
                    ? 'Редактировать связь'
                    : dialogType === 'person'
                      ? 'Добавить человека'
                      : dialogType === 'organization'
                        ? 'Добавить организацию'
                        : dialogType === 'text'
                          ? 'Добавить текст'
                          : 'Создать связь'}
              </DialogTitle_Component>
            </DialogHeader_Component>
            <div className="px-4">
              {dialogType === 'connection' ? (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="label">Название связи</Label>
                    <Input
                      id="label"
                      value={dialogData.label}
                      onChange={(e) => setDialogData({ ...dialogData, label: e.target.value })}
                      placeholder="Например: Студент, Преподаватель"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="color">Цвет</Label>
                    <div className="flex gap-2 flex-wrap">
                      {['#a3e635', '#5eead4', '#fbbf24', '#fda4af', '#c4b5fd', '#60a5fa'].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full ${dialogData.labelColor === color ? 'ring-2 ring-offset-2 ring-indigo-600' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setDialogData({ ...dialogData, labelColor: color })}
                          aria-label={`Color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="content">Название</Label>
                    <Input
                      id="content"
                      value={dialogData.content}
                      onChange={(e) => setDialogData({ ...dialogData, content: e.target.value })}
                      placeholder={
                        dialogType === 'person'
                          ? 'Имя Фамилия'
                          : dialogType === 'organization'
                            ? 'Название организации'
                            : 'Текст'
                      }
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter_Component>
              <Button onClick={handleDialogConfirm}>
                {editingElement || editingConnection
                  ? 'Сохранить изменения'
                  : dialogType === 'connection'
                    ? 'Создать связь'
                    : 'Добавить'}
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  onClick={handleDialogCancel}
                >
                  Отмена
                </Button>
              </DrawerClose>
            </DialogFooter_Component>
          </DialogContent_Component>
        </Drawer>
      ) : (
        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <DialogContent_Component>
            <DialogHeader_Component>
              <DialogTitle_Component>
                {editingElement
                  ? 'Редактировать элемент'
                  : editingConnection
                    ? 'Редактировать связь'
                    : dialogType === 'person'
                      ? 'Добавить человека'
                      : dialogType === 'organization'
                        ? 'Добавить организацию'
                        : dialogType === 'text'
                          ? 'Добавить текст'
                          : 'Создать связь'}
              </DialogTitle_Component>
            </DialogHeader_Component>
            {dialogType === 'connection' ? (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="label">Название связи</Label>
                  <Input
                    id="label"
                    value={dialogData.label}
                    onChange={(e) => setDialogData({ ...dialogData, label: e.target.value })}
                    placeholder="Например: Студент, Преподаватель"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Цвет</Label>
                  <div className="flex gap-2 flex-wrap">
                    {['#a3e635', '#5eead4', '#fbbf24', '#fda4af', '#c4b5fd', '#60a5fa'].map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full ${dialogData.labelColor === color ? 'ring-2 ring-offset-2 ring-indigo-600' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setDialogData({ ...dialogData, labelColor: color })}
                        aria-label={`Color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="content">Название</Label>
                  <Input
                    id="content"
                    value={dialogData.content}
                    onChange={(e) => setDialogData({ ...dialogData, content: e.target.value })}
                    placeholder={
                      dialogType === 'person'
                        ? 'Имя Фамилия'
                        : dialogType === 'organization'
                          ? 'Название организации'
                          : 'Текст'
                    }
                  />
                </div>
              </div>
            )}
            <DialogFooter_Component>
              <Button
                variant="outline"
                onClick={handleDialogCancel}
              >
                Отмена
              </Button>
              <Button onClick={handleDialogConfirm}>
                {editingElement || editingConnection
                  ? 'Сохранить изменения'
                  : dialogType === 'connection'
                    ? 'Создать связь'
                    : 'Добавить'}
              </Button>
            </DialogFooter_Component>
          </DialogContent_Component>
        </Dialog>
      )}
    </PageLayout>
  );
};
