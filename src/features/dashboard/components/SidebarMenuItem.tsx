import { useLocation, useNavigate } from "react-router-dom";
import { MenuItemType } from "../data/menu";

export const SidebarMenuItem = ({ icon: Icon, label, path, disabled }: MenuItemType) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === path;

    return (
        <li>
            <button
                onClick={() => !disabled && navigate(path)}
                disabled={disabled}
                className={`
                    w-full flex items-center gap-3 px-4 py-2.5 text-[14px] rounded-lg transition-all duration-200
                    ${isActive
                        ? "bg-[#E2E4E9] text-[#1E1E1E] font-medium"
                        : "text-[#52525B] font-medium bg-transparent"
                    }
                    ${!disabled && !isActive ? "hover:bg-gray-50 cursor-pointer" : ""}
                    ${disabled && !isActive ? "cursor-default opacity-100" : ""}
                `}
            >
                <Icon size={20} strokeWidth={2} className={isActive ? "text-[#1E1E1E]" : "text-[#52525B]"} />
                {label}
            </button>
        </li>
    );
};