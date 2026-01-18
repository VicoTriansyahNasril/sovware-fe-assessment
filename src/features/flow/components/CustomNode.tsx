import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Cpu } from 'lucide-react';
import { clsx } from 'clsx';
import { AppNode } from '../types';

const CustomNode = ({ data, selected }: NodeProps<AppNode>) => {
    return (
        <div className={clsx(
            "relative bg-white rounded-[12px] w-[200px] transition-all duration-200 group flex flex-col items-center justify-center py-6 px-4",
            selected
                ? "border-2 border-[#2D68A2] shadow-xl shadow-blue-100"
                : "border border-[#E2E8F0] shadow-sm hover:border-gray-300"
            )}>
            <Handle
                type="target"
                position={Position.Left}
                className="!w-4 !h-4 !bg-white !border-[3px] !border-[#CBD5E1] !-left-[10px]"
            />
            <div className="mb-3 text-[#1E1E1E]">
                <Cpu size={36} strokeWidth={2} />
            </div>
            <p className="text-[13px] font-bold text-[#1E1E1E] text-center leading-tight">
                {data.label}
            </p>
            <Handle
                type="source"
                position={Position.Right}
                className="!w-4 !h-4 !bg-white !border-[3px] !border-[#CBD5E1] !-right-[10px]"
            />
        </div>
    );
};

export default memo(CustomNode);