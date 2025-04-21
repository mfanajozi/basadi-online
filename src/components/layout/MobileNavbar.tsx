
import { Home, Search, ShoppingBag, User, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MobileNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
    },
    {
      icon: Menu,
      label: "Menu",
      path: "/menu",
    },
    {
      icon: Search,
      label: "Search",
      path: "/search",
    },
    {
      icon: ShoppingBag,
      label: "Cart",
      path: "/cart",
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-xs font-medium",
              location.pathname === item.path
                ? "text-gold-500"
                : "text-gray-500"
            )}
          >
            <item.icon
              size={24}
              className={cn(
                location.pathname === item.path ? "text-gold-500" : "text-gray-500"
              )}
            />
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
