
import React from "react";
import { Header } from "./Header";
import { MobileNavbar } from "./MobileNavbar";

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  showNavbar?: boolean;
  showCart?: boolean;
  showSearch?: boolean;
  className?: string;
}

export function PageContainer({
  children,
  title,
  showHeader = true,
  showBackButton = false,
  showNavbar = true,
  showCart = true,
  showSearch = true,
  className = "",
}: PageContainerProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {showHeader && (
        <Header 
          title={title} 
          showBackButton={showBackButton}
          showCart={showCart}
          showSearch={showSearch}
        />
      )}
      <main className={`flex-1 pb-16 ${className}`}>{children}</main>
      {showNavbar && <MobileNavbar />}
    </div>
  );
}
