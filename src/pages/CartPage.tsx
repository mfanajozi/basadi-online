
import { useCart } from "@/hooks/useCart";
import { PageContainer } from "@/components/layout/PageContainer";
import { formatCurrency } from "@/lib/utils";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

const CartPage = () => {
  const { items, cartItemsCount } = useCart();

  if (cartItemsCount === 0) {
    return (
      <PageContainer title="Cart" showBackButton>
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <p className="text-lg text-gray-500">Your cart is empty</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Cart" showBackButton>
      <div className="container-custom pb-32">
        <div className="divide-y mb-20">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>
    </PageContainer>
  );
};

export default CartPage;
