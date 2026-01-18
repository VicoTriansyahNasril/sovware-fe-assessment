import { Gauge, Monitor, LayoutGrid, User, LucideIcon } from "lucide-react";

export interface MenuItemType {
    icon: LucideIcon;
    label: string;
    path: string;
    disabled?: boolean;
}

export const DASHBOARD_MENU: MenuItemType[] = [
    { icon: Gauge, label: "Dashboard", path: "/dashboard-main", disabled: true },
    { icon: Monitor, label: "Monitor", path: "/monitor", disabled: true },
    { icon: LayoutGrid, label: "Design", path: "/dashboard", disabled: false },
];

export const MANAGEMENT_MENU: MenuItemType[] = [
    { icon: User, label: "User Management", path: "/users", disabled: true },
];