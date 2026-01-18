import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";

export const FlowHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="h-[72px] bg-white border-b border-gray-200 flex items-center px-6 z-20 relative shrink-0">
            <button
                onClick={() => navigate('/dashboard')}
                className="w-[40px] h-[40px] bg-[#2D68A2] rounded-lg flex items-center justify-center text-white shadow-md hover:bg-[#245485] transition-colors mr-5"
            >
                <ArrowLeft size={20} strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-3">
                <h1 className="font-extrabold text-[#1E1E1E] text-[18px]">Design Mode</h1>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Pencil size={16} />
                </button>
            </div>
        </div>
    );
};