import React, { useCallback, useRef, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    ReactFlowProvider,
    useReactFlow,
    MarkerType,
    NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import toast from 'react-hot-toast';
import { Button } from '@heroui/react';

import Sidebar from './Sidebar';
import CustomNode from './CustomNode';
import { AppNode } from '../types';

const nodeTypes: NodeTypes = {
    processorNode: CustomNode,
};

const FlowBuilderContent = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const { screenToFlowPosition } = useReactFlow();
    const [isPublishing, setIsPublishing] = useState(false);

    const onConnect = useCallback(
        (params: Connection) => {
            if (params.source === params.target) {
                toast.error("Cannot connect a processor to itself!");
                return;
            }
            setEdges((eds) => addEdge({
                ...params,
                markerEnd: { type: MarkerType.ArrowClosed },
                animated: true,
                style: { stroke: '#2563eb', strokeWidth: 2 }
            }, eds));
        },
        [setEdges],
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow/type');
            const label = event.dataTransfer.getData('application/reactflow/label');
            const icon = event.dataTransfer.getData('application/reactflow/icon');

            if (!type) return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: AppNode = {
                id: `node_${Date.now()}`,
                type: 'processorNode',
                position,
                data: {
                    label,
                    iconType: icon
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, setNodes],
    );

    const handlePublish = () => {
        if (nodes.length === 0) {
            toast.error("Canvas is empty. Nothing to publish.");
            return;
        }

        const connectedNodeIds = new Set();
        edges.forEach(edge => {
            connectedNodeIds.add(edge.source);
            connectedNodeIds.add(edge.target);
        });

        const isolatedNodes = nodes.filter(node => !connectedNodeIds.has(node.id));

        if (isolatedNodes.length > 0) {
            toast.error("Please check your design. Some processors are not connected.");
            return;
        }

        setIsPublishing(true);

        setTimeout(() => {
            const payload = { nodes, edges };
            console.log("PAYLOAD TO BACKEND:", JSON.stringify(payload, null, 2));
            toast.success("Design published successfully!");
            setIsPublishing(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-white">
            <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white z-20 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">S</div>
                    <h1 className="text-lg font-bold text-gray-800">Flow Designer</h1>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="bordered"
                        color="danger"
                        size="sm"
                        onClick={() => {
                            if (confirm("Are you sure? All unsaved changes will be lost.")) {
                                setNodes([]);
                                setEdges([]);
                            }
                        }}
                    >
                        Clear Canvas
                    </Button>
                    <Button
                        color="primary"
                        size="sm"
                        className="font-medium"
                        isLoading={isPublishing}
                        onClick={handlePublish}
                    >
                        Publish Flow
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <div className="flex-1 h-full bg-gray-50 relative" ref={reactFlowWrapper}>
                    <ReactFlow<AppNode, Edge>
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodeTypes={nodeTypes}
                        fitView
                        className="bg-gray-50"
                    >
                        <Controls className="!bg-white !shadow-md !border-gray-200 !rounded-lg" />
                        <MiniMap
                            className="!bg-white !border-gray-200 !shadow-md !rounded-lg"
                            nodeColor="#e2e8f0"
                        />
                        <Background color="#94a3b8" gap={16} size={1} />
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
};

export default function FlowBuilder() {
    return (
        <ReactFlowProvider>
            <FlowBuilderContent />
        </ReactFlowProvider>
    );
}