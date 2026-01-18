import { Panel } from '@xyflow/react';
import {
    ChevronDown, Flag, Layers, Filter, Cloud, Cpu, FileOutput, CloudUpload
} from "lucide-react";
import { ReactNode } from 'react';

interface CanvasControlsProps {
    onOpenProcessor: () => void;
    onPublish: () => void;
}

interface ToolbarButtonProps {
    icon: ReactNode;
    label: string;
    onClick?: () => void;
    isActive?: boolean;
}

const ToolbarButton = ({ icon, label, onClick, isActive }: ToolbarButtonProps) => (
    <button
        onClick={onClick}
        className={`
            flex flex-col items-center justify-center w-[85px] h-[65px] rounded-xl border transition-all duration-200 bg-white
            ${isActive
                ? 'border-blue-200 text-[#2D68A2] shadow-lg shadow-blue-50 ring-1 ring-blue-100'
                : 'border-gray-100 text-[#64748B] hover:border-gray-300 hover:shadow-md shadow-[0_4px_12px_rgba(0,0,0,0.03)]'
            }
        `}
    >
        <div className={`mb-1.5 ${isActive ? "text-[#2D68A2]" : "text-[#64748B]"}`}>
            {icon}
        </div>
        <span className="text-[11px] font-semibold tracking-wide">{label}</span>
    </button>
);

export const CanvasControls = ({ onOpenProcessor, onPublish }: CanvasControlsProps) => {
    return (
        <>
            <Panel position="top-left" className="m-6 flex items-start gap-3">
                <button className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-[#1E1E1E]">
                    <span className="text-sm text-gray-500 font-medium">Version <span className="text-[#1E1E1E] font-bold">0.1</span></span>
                    <ChevronDown size={16} className="text-gray-400" />
                </button>
                <button className="w-[42px] h-[42px] flex items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm hover:bg-gray-50 text-gray-500 transition-all">
                    <Flag size={20} />
                </button>
            </Panel>

            <Panel position="top-right" className="m-6 flex gap-3">
                <ToolbarButton icon={<Layers size={20} />} label="Parameter" />
                <ToolbarButton icon={<Filter size={20} />} label="Funnel" />
                <ToolbarButton icon={<Cloud size={20} />} label="RPG" />

                <ToolbarButton
                    icon={<Cpu size={20} />}
                    label="Processor"
                    onClick={onOpenProcessor}
                    isActive
                />

                <ToolbarButton icon={<FileOutput size={20} />} label="Export" />
                <ToolbarButton
                    icon={<CloudUpload size={20} />}
                    label="Publish"
                    onClick={onPublish}
                />
            </Panel>

            <Panel position="bottom-right" className="m-4">
                <div className="bg-white border border-gray-100 shadow-lg px-4 py-2 rounded-lg">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Last Update : 6/24/2024</p>
                </div>
            </Panel>
        </>
    );
};