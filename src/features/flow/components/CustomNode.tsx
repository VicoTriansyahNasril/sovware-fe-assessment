import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { FaDatabase, FaServer, FaFileCode, FaNetworkWired, FaTerminal } from 'react-icons/fa';
import { clsx } from 'clsx';
import { AppNode } from '../types';

const getIcon = (type: string) => {
    switch (type) {
        case 'PutSQL': return <FaDatabase className="text-xl text-gray-600" />;
        case 'AppendHostInfo': return <FaServer className="text-xl text-gray-600" />;
        case 'AttributesToJSON': return <FaFileCode className="text-xl text-gray-600" />;
        case 'RouteOnAttribute': return <FaNetworkWired className="text-xl text-gray-600" />;
        default: return <FaTerminal className="text-xl text-gray-600" />;
    }
};

const CustomNode = ({ data, selected }: NodeProps<AppNode>) => {
    return (
        <div className={clsx(
            "relative flex flex-col items-center justify-center w-[180px] bg-white rounded-lg transition-all duration-200",
            selected
                ? "border-2 border-blue-500 shadow-lg shadow-blue-500/20"
                : "border border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md"
        )}>
            <Handle
                type="target"
                position={Position.Left}
                className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !-left-1.5"
            />

            {/* Body Node */}
            <div className="flex flex-col items-center p-4 w-full">
                {/* Icon Box */}
                <div className="p-3 mb-2 bg-gray-50 rounded-lg border border-gray-100">
                    {getIcon(data.iconType)}
                </div>

                {/* Label & Type */}
                <div className="text-center w-full">
                    <p className="text-sm font-bold text-gray-800 truncate px-2">{data.label}</p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mt-1">Processor</p>
                </div>
            </div>

            {/* Handle Kanan (Output) */}
            <Handle
                type="source"
                position={Position.Right}
                className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !-right-1.5"
            />
        </div>
    );
};

export default memo(CustomNode);