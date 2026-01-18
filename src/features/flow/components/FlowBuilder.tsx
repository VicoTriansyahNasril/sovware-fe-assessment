import { ReactFlow, MiniMap, Controls, Background, ReactFlowProvider, NodeTypes, EdgeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import { FlowHeader } from './FlowHeader';
import { CanvasControls } from './CanvasControls';
import { ProcessorModal } from './ProcessorModal';
import { ConnectionModal } from './ConnectionModal';
import { PublishModal } from './PublishModal';
import { ConfirmPublishModal } from './ConfirmPublishModal';
import { useFlowLogic } from '../hooks/useFlowLogic';

const nodeTypes: NodeTypes = { processorNode: CustomNode };
const edgeTypes: EdgeTypes = { custom: CustomEdge };

const FlowBuilderContent = () => {
    const {
        nodes, edges, onNodesChange, onEdgesChange,
        onConnect, onNodesDelete, onEdgesDelete,
        flowWrapperRef,
        modals, toggleModal,
        handleAddProcessor, handleAddConnection,
        handlePublishClick, handleProceedToConfirm, handleFinalPublish
    } = useFlowLogic();

    return (
        <div className="flex flex-col h-screen w-full bg-white">
            <FlowHeader />

            <div
                className="flex-1 h-full relative bg-[#FCFCFD] outline-none"
                ref={flowWrapperRef}
                tabIndex={0}
                onClick={() => flowWrapperRef.current?.focus()}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodesDelete={onNodesDelete}
                    onEdgesDelete={onEdgesDelete}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    fitView
                    deleteKeyCode={['Backspace', 'Delete']}
                    selectionKeyCode={['Shift']}
                    multiSelectionKeyCode={['Control']}
                    className="bg-[#FCFCFD]"
                >
                    <Background color="#E2E8F0" gap={24} size={1.5} />

                    <CanvasControls
                        onOpenProcessor={() => toggleModal('processor', true)}
                        onPublish={handlePublishClick}
                    />

                    <Controls className="!bg-white !shadow-xl !border-gray-100 !rounded-xl !m-6 !p-1" />
                    <MiniMap className="!bg-white !border-gray-100 !shadow-xl !rounded-xl !m-6" nodeColor="#E2E8F0" />
                </ReactFlow>

                <div className="absolute bottom-4 right-6 bg-white border border-gray-100 shadow-lg px-4 py-2 rounded-lg z-10 pointer-events-none">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Last Update : 6/24/2024</p>
                </div>
            </div>

            <ProcessorModal
                isOpen={modals.processor}
                onClose={() => toggleModal('processor', false)}
                onAdd={handleAddProcessor}
            />

            <ConnectionModal
                isOpen={modals.connection}
                onClose={() => toggleModal('connection', false)}
                onConfirm={handleAddConnection}
            />

            <PublishModal
                isOpen={modals.publish}
                onClose={() => toggleModal('publish', false)}
                onPublish={handleProceedToConfirm}
                data={{ nodes, edges }}
            />

            <ConfirmPublishModal
                isOpen={modals.confirm}
                onClose={() => toggleModal('confirm', false)}
                onConfirm={handleFinalPublish}
            />
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