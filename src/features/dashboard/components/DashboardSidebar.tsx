import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import logoSvg from "@/assets/logo.svg";
import { DASHBOARD_MENU, MANAGEMENT_MENU } from "../data/menu";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { LogoutModal } from "@/features/auth/components/LogoutModal";
import { useState } from "react";

export const DashboardSidebar = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogoutConfirm = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <aside className="w-[260px] border-r border-gray-100 flex flex-col bg-white flex-shrink-0 z-20 h-screen">
                <div className="h-[80px] px-8 flex items-center gap-3 mb-2">
                    <img src={logoSvg} alt="Logo" className="w-[38px] h-[38px]" />
                    <div className="flex flex-col justify-center">
                        <span className="font-extrabold text-[#1E1E1E] text-[20px] leading-none">S.2.R.E</span>
                        <span className="text-[10px] font-bold text-[#1E1E1E] tracking-[0.3em] mt-1 ml-0.5">ADMIN</span>
                    </div>
                </div>

                <div className="flex-1 px-4 overflow-y-auto py-4">
                    <div className="mb-8">
                        <p className="px-4 text-[12px] font-medium text-[#9CA3AF] mb-2">Dashboard</p>
                        <ul className="space-y-1">
                            {DASHBOARD_MENU.map((item) => (
                                <SidebarMenuItem key={item.label} {...item} />
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="px-4 text-[12px] font-medium text-[#9CA3AF] mb-2">Management</p>
                        <ul className="space-y-1">
                            {MANAGEMENT_MENU.map((item) => (
                                <SidebarMenuItem key={item.label} {...item} />
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100">
                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[14px] font-bold text-white bg-[#2D68A2] rounded-lg hover:bg-[#245485] transition-colors shadow-sm"
                    >
                        <LogOut size={18} strokeWidth={2.5} />
                        Logout
                    </button>
                </div>
            </aside>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
            />
        </>
    );
};