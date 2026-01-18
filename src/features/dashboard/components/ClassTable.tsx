import { ChevronLeft, ChevronRight } from "lucide-react";

interface ClassItem {
    id: string;
    agents: number;
}

interface ClassTableProps {
    data: ClassItem[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export const ClassTable = ({ data, selectedId, onSelect }: ClassTableProps) => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-2 px-6 pb-3 border-b border-gray-100 mb-2">
                <div className="text-[12px] font-bold text-gray-400">Class ID</div>
                <div className="text-[12px] font-bold text-gray-400 pl-12">Number of Agents</div>
            </div>
            <div className="space-y-1">
                {data.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={`grid grid-cols-2 items-center px-6 py-4 rounded-lg cursor-pointer transition-all duration-200 border border-transparent ${selectedId === item.id
                                ? "bg-[#F3F4F6] border-gray-200 shadow-sm"
                                : "hover:bg-[#FAFAFA]"
                            }`}
                    >
                        <div className={`text-sm ${selectedId === item.id ? "text-[#1E1E1E] font-bold" : "text-[#1E1E1E] font-medium"}`}>
                            {item.id}
                        </div>
                        <div className={`text-sm pl-12 ${selectedId === item.id ? "text-[#1E1E1E] font-bold" : "text-[#1E1E1E] font-medium"}`}>
                            {item.agents}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-10">
                <div className="flex items-center bg-[#F1F5F9] rounded-lg p-1 gap-1">
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-50 rounded-md transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <div className="w-8 h-8 flex items-center justify-center bg-[#2D68A2] text-white text-xs font-bold rounded-md shadow-sm">
                        1
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-md transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};