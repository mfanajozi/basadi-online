
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function CartSummary() {
  const navigate = useNavigate();
  const {
    calculateTotalPrice,
    calculateDeliveryFee,
    calculatePaymentFee,
    calculateFinalAmount
  } = useCart();

  const subtotal = calculateTotalPrice();
  const deliveryFee = calculateDeliveryFee();
  const paymentFee = calculatePaymentFee();
  const total = calculateFinalAmount();

  return (
    <Card className="fixed bottom-0 left-0 right-0 rounded-none md:sticky md:rounded-lg pb-16">
      <CardContent className="grid gap-4 p-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {deliveryFee > 0 && (
          <div className="flex justify-between text-sm">
            <span>Delivery Fee</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>
        )}
        {paymentFee > 0 && (
          <div className="flex justify-between text-sm">
            <span>Payment Fee</span>
            <span>{formatCurrency(paymentFee)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-gold hover:bg-gold/90 text-black"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
