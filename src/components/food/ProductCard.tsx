
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="relative h-40 w-full">
        <img
          src={product.image}
          alt={product.product}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Use different placeholders based on category
            const category = product.category.toLowerCase();
            let placeholderUrl = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38";
            
            if (category === "burger") {
              placeholderUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd";
            } else if (category === "kota") {
              placeholderUrl = "https://images.unsplash.com/photo-1603064752734-4c48eff53d05";
            } else if (category === "pizza") {
              placeholderUrl = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38";
            } else if (category === "sandwich") {
              placeholderUrl = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af";
            } else if (category === "wings") {
              placeholderUrl = "https://images.unsplash.com/photo-1608039755401-742074f0548d";
            }
            
            e.currentTarget.src = `${placeholderUrl}?auto=format&fit=crop&w=300&h=200&q=80`;
          }}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg">{product.product}</h3>
        <p className="text-gray-600 text-sm mt-1 flex-1">
          {product.ingredients.slice(0, 3).join(', ')}
          {product.ingredients.length > 3 && '...'}
        </p>
        <div className="flex items-center justify-between mt-3">
          <p className="font-bold text-lg">{formatCurrency(product.price)}</p>
          <Button 
            size="sm"
            className="rounded-full p-0 w-8 h-8 bg-gold hover:bg-gold-600"
            onClick={handleAddToCart}
          >
            <Plus className="h-5 w-5 text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
}
