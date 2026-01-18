import { LayoutGrid } from "lucide-react";

interface DashboardHeaderProps {
    title: string;
}

export const DashboardHeader = ({ title }: DashboardHeaderProps) => {
    return (
        <header className="h-[72px] border-b border-gray-100 flex items-center px-8 bg-white flex-shrink-0">
            <div className="flex items-center text-sm text-[#64748B]">
                <span className="font-normal hover:text-gray-900 cursor-pointer transition-colors">Home</span>
                <span className="mx-3 text-gray-300">/</span>
                <div className="flex items-center gap-2 text-[#1E1E1E] font-normal">
                    <LayoutGrid size={16} fill="currentColor" strokeWidth={0} />
                    {title}
                </div>
            </div>
        </header>
    );
};