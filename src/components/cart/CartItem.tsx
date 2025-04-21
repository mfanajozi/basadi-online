
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, Product } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: Product;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const quantity = item.quantity || 1;

  return (
    <div className="flex gap-4 py-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.product}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=320&q=80";
          }}
        />
      </div>
      
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="font-semibold">{item.product}</h3>
          <p className="font-medium">{formatCurrency(item.price * quantity)}</p>
        </div>
        
        <p className="mt-1 text-sm text-gray-500">
          {item.ingredients.join(", ")}
        </p>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => quantity > 1 ? updateQuantity(item.id, quantity - 1) : removeFromCart(item.id)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
