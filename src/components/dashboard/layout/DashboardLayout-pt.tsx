import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar-pt";
import TopNavigation from "./TopNavigation-pt";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
      <div className="flex-1 flex flex-col">
        <TopNavigation />
        <main className="flex-1 pt-16 px-6 pb-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
