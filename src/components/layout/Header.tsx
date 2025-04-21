import { ArrowLeft, Search, ShoppingBag } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";
interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showCart?: boolean;
  showSearch?: boolean;
}
export function Header({
  title = "Basadi's Kitchen",
  showBackButton = false,
  showCart = true,
  showSearch = true
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cartItemsCount
  } = useCart();
  const isHomePage = location.pathname === '/';
  return <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center">
          {showBackButton && <button onClick={() => navigate(-1)} className="mr-2 rounded-full p-2 hover:bg-gray-100">
              <ArrowLeft size={20} />
            </button>}
          {isHomePage ? <div className="flex items-center">
              <div className="h-12 w-12 mr-2">
                <img src="/lovable-uploads/b1683684-9a8e-43eb-88ac-a1d2033e1e4c.png" alt="Basadi's Kitchen" className="h-120 w-120 object-contain" />
              </div>
              
            </div> : <h1 className="text-lg font-bold">{title}</h1>}
        </div>
        
        <div className="flex items-center space-x-2">
          {showSearch && <button onClick={() => navigate('/search')} className="rounded-full p-2 hover:bg-gray-100" aria-label="Search">
              <Search size={20} />
            </button>}
          
          {showCart && <button onClick={() => navigate('/cart')} className="rounded-full p-2 hover:bg-gray-100 relative" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center bg-gold text-black p-0 text-xs">
                  {cartItemsCount}
                </Badge>}
            </button>}
        </div>
      </div>
    </header>;
}