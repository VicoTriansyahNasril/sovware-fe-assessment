import { Card, CardBody } from "@heroui/react";
import { FaDatabase, FaServer, FaFileCode, FaNetworkWired } from 'react-icons/fa';
import { ProcessorType } from "../types";

const PROCESSORS: ProcessorType[] = [
    { type: 'processorNode', label: 'PutSQL', icon: 'PutSQL', description: 'Execute SQL updates' },
    { type: 'processorNode', label: 'AppendHostInfo', icon: 'AppendHostInfo', description: 'Append host details' },
    { type: 'processorNode', label: 'AttributesToJSON', icon: 'AttributesToJSON', description: 'Convert attributes' },
    { type: 'processorNode', label: 'RouteOnAttribute', icon: 'RouteOnAttribute', description: 'Route based on attr' },
];

const Sidebar = () => {
    const onDragStart = (event: React.DragEvent, nodeType: string, label: string, iconType: string) => {
        event.dataTransfer.setData('application/reactflow/type', nodeType);
        event.dataTransfer.setData('application/reactflow/label', label);
        event.dataTransfer.setData('application/reactflow/icon', iconType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const getIcon = (name: string) => {
        switch (name) {
            case 'PutSQL': return <FaDatabase />;
            case 'AppendHostInfo': return <FaServer />;
            case 'AttributesToJSON': return <FaFileCode />;
            case 'RouteOnAttribute': return <FaNetworkWired />;
            default: return <FaServer />;
        }
    };

    return (
        <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-800">Processors</h2>
                <p className="text-xs text-gray-500">Drag to canvas</p>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {PROCESSORS.map((proc) => (
                    <div
                        key={proc.label}
                        draggable
                        onDragStart={(e) => onDragStart(e, proc.type, proc.label, proc.icon)}
                        className="cursor-grab active:cursor-grabbing"
                    >
                        <Card className="hover:border-blue-400 border border-transparent transition-colors shadow-sm">
                            <CardBody className="flex flex-row items-center gap-3 p-3 overflow-hidden">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-md text-lg">
                                    {getIcon(proc.icon)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-gray-700">{proc.label}</span>
                                    <span className="text-[10px] text-gray-400 truncate w-32">{proc.description}</span>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;