import { useCallback, useRef, useState, RefObject } from 'react';
import {
    useNodesState, useEdgesState, addEdge, Connection, Edge,
    MarkerType, OnNodesDelete, OnEdgesDelete, useReactFlow,
    NodeChange, EdgeChange
} from '@xyflow/react';
import toast from 'react-hot-toast';
import { CheckCircle2, X } from "lucide-react";
import { AppNode } from '../types';

export interface UseFlowLogicReturn {
    nodes: AppNode[];
    edges: Edge[];
    onNodesChange: (changes: NodeChange<AppNode>[]) => void;
    onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
    onConnect: (params: Connection) => void;
    onNodesDelete: OnNodesDelete;
    onEdgesDelete: OnEdgesDelete;
    onDragOver: (event: React.DragEvent) => void;
    onDrop: (event: React.DragEvent) => void;
    flowWrapperRef: RefObject<HTMLDivElement | null>;
    modals: {
        processor: boolean;
        connection: boolean;
        publish: boolean;
        confirm: boolean;
    };
    toggleModal: (modal: 'processor' | 'connection' | 'publish' | 'confirm', isOpen: boolean) => void;
    handleAddProcessor: (processorId: string) => void;
    handleAddConnection: (label: string) => void;
    handlePublishClick: () => void;
    handleProceedToConfirm: () => void;
    handleFinalPublish: () => void;
}

export const useFlowLogic = (): UseFlowLogicReturn => {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const { getNodes, screenToFlowPosition } = useReactFlow();
    const flowWrapperRef = useRef<HTMLDivElement>(null);

    const [modals, setModals] = useState({
        processor: false,
        connection: false,
        publish: false,
        confirm: false,
    });

    const [pendingConnection, setPendingConnection] = useState<Connection | null>(null);

    const toggleModal = useCallback((modal: keyof typeof modals, isOpen: boolean) => {
        setModals(prev => ({ ...prev, [modal]: isOpen }));
    }, []);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow/type');
            const label = event.dataTransfer.getData('application/reactflow/label');

            if (typeof type === 'undefined' || !type || !label) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: AppNode = {
                id: `node_${Date.now()}`,
                type: 'processorNode',
                position,
                data: { label, iconType: 'Cpu' },
            };

            setNodes((nds) => nds.concat(newNode));
            toast.success(`${label} dropped`);
        },
        [screenToFlowPosition, setNodes],
    );

    const handleAddProcessor = useCallback((processorId: string) => {
        const existingNodes = getNodes();
        const baseX = 400;
        const baseY = 300;
        const offset = existingNodes.length * 50;

        const newNode: AppNode = {
            id: `node_${Date.now()}`,
            type: 'processorNode',
            position: { x: baseX + offset, y: baseY + (Math.random() * 20) },
            data: { label: processorId, iconType: 'Cpu' },
        };

        setNodes((nds) => nds.concat(newNode));
        toast.success(`${processorId} added`);
    }, [getNodes, setNodes]);

    const onConnect = useCallback((params: Connection) => {
        if (params.source === params.target) {
            toast.error("Cannot connect to itself");
            return;
        }
        setPendingConnection(params);
        toggleModal('connection', true);
    }, [toggleModal]);

    const handleAddConnection = useCallback((label: string) => {
        if (pendingConnection) {
            setEdges((eds) => addEdge({
                ...pendingConnection,
                type: 'custom',
                label: label,
                markerEnd: { type: MarkerType.ArrowClosed },
                animated: true,
                style: { stroke: '#2D68A2', strokeWidth: 1.5 }
            }, eds));
            setPendingConnection(null);
        }
    }, [pendingConnection, setEdges]);

    const handlePublishClick = useCallback(() => {
        if (nodes.length === 0) {
            toast.error("Canvas is empty.");
            return;
        }
        toggleModal('publish', true);
    }, [nodes, toggleModal]);

    const handleProceedToConfirm = useCallback(() => {
        toggleModal('publish', false);
        toggleModal('confirm', true);
    }, [toggleModal]);

    const handleFinalPublish = useCallback(() => {
        toggleModal('confirm', false);

        console.group("Publishing Design Flow");
        console.log("Timestamp:", new Date().toISOString());
        console.log("Payload:", JSON.stringify({ nodes, edges }, null, 2));
        console.groupEnd();

        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col w-[300px] overflow-hidden border border-gray-100`}>
                <div className="flex p-4 items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
                            <CheckCircle2 className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                        </div>
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-[13px] font-bold text-[#1E1E1E] leading-tight">
                            Design Flow Published
                        </p>
                        <p className="mt-1 text-[13px] text-gray-500 leading-tight">
                            Successfully
                        </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>

                <div className="h-1 w-full bg-gray-100">
                    <div className="h-full bg-[#22C55E] animate-progress origin-left w-full"></div>
                </div>
            </div>
        ), {
            duration: 3000,
            position: 'bottom-right',
        });
    }, [nodes, edges, toggleModal]);

    const onNodesDelete: OnNodesDelete = useCallback((deleted) => {
        toast.success(`Deleted ${deleted.length} node(s)`);
    }, []);

    const onEdgesDelete: OnEdgesDelete = useCallback((deleted) => {
        toast.success(`Deleted ${deleted.length} connection(s)`);
    }, []);

    return {
        nodes, edges, onNodesChange, onEdgesChange,
        onConnect, onNodesDelete, onEdgesDelete,
        onDragOver, onDrop,
        flowWrapperRef,
        modals, toggleModal,
        handleAddProcessor,
        handleAddConnection,
        handlePublishClick,
        handleProceedToConfirm,
        handleFinalPublish
    };
};