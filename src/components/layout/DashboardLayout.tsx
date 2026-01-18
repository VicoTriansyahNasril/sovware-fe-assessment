import { ReactNode } from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";

interface DashboardLayoutProps {
    children: ReactNode;
    title: string;
}

export const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
    return (
        <div className="flex h-screen bg-white font-inter overflow-hidden">
            <DashboardSidebar />
            <main className="flex-1 flex flex-col min-w-0 bg-white relative">
                <DashboardHeader title={title} />
                <div className="flex-1 p-8 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};