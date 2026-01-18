import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid } from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SearchAction } from "@/features/dashboard/components/SearchAction";
import { ClassTable } from "@/features/dashboard/components/ClassTable";
import { FlowVersionModal } from "@/features/flow/components/FlowVersionModal";
import { MOCK_CLASSES } from "@/features/dashboard/data/mockClasses";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    const handleOpenClass = () => {
        if (selectedClass) {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <DashboardLayout title="Dashboards">
                <div className="mb-8 flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center flex-shrink-0">
                        <LayoutGrid className="text-2xl text-[#1E1E1E]" fill="currentColor" strokeWidth={0} />
                    </div>
                    <div className="pt-0.5">
                        <h1 className="text-[22px] font-bold text-[#1E1E1E] leading-tight">Design Class</h1>
                        <p className="text-sm text-gray-500 font-medium mt-1">Select Your Class</p>
                    </div>
                </div>

                <SearchAction onOpenClass={handleOpenClass} isDisabled={!selectedClass} />

                <ClassTable
                    data={MOCK_CLASSES}
                    selectedId={selectedClass}
                    onSelect={setSelectedClass}
                />
            </DashboardLayout>

            <FlowVersionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onOpenDesign={() => navigate('/design')}
            />
        </>
    );
};

export default DashboardPage;