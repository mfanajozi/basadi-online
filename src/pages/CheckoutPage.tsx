import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const CheckoutPage = () => {
  const { items, calculateTotalPrice, clearCart, setDeliveryAddress, calculateDeliveryFee, deliveryMethod } = useCart();
  const [deliveryOption, setDeliveryOption] = useState("delivery"); // delivery or collect
  const [paymentOption, setPaymentOption] = useState("online"); // online or store

  useEffect(() => {
    // Placeholder for setting delivery address (replace with actual user input)
    setDeliveryAddress({
      address: "123 Main Street, Anytown",
      latitude: -26.1952,
      longitude: 28.0341,
    });
  }, [setDeliveryAddress]);

  const subtotal = calculateTotalPrice();
  const deliveryFee = calculateDeliveryFee();
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    // Simulate iKhokha payment process
    window.location.href = "/payment"; // Redirect to a simulated payment page
    clearCart();
  };

  return (
    <PageContainer title="Checkout" showBackButton>
      <div className="container-custom pb-32">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {/* Delivery Address */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Delivery Address</h3>
          <p>342 Sekhuknune Street, Mapetla, Soweto, 1818</p>
        </div>

        {/* Delivery Options */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Delivery Options</h3>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="deliveryOption"
              value="delivery"
              checked={deliveryOption === "delivery"}
              onChange={() => setDeliveryOption("delivery")}
            />
            <span>Delivery</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="deliveryOption"
              value="collect"
              checked={deliveryOption === "collect"}
              onChange={() => setDeliveryOption("collect")}
            />
            <span>Order and Collect</span>
          </label>
        </div>

        {/* Payment Options */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Payment Options</h3>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentOption"
              value="online"
              checked={paymentOption === "online"}
              onChange={() => setPaymentOption("online")}
            />
            <span>Pay Online</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentOption"
              value="store"
              checked={paymentOption === "store"}
              onChange={() => setPaymentOption("store")}
            />
            <span>Order and Pay at the Store</span>
          </label>
        </div>

        {/* Order Summary */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Order Summary</h3>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.product}</span>
              <span>{formatCurrency(item.price)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Delivery Fee</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Place Order Button */}
        <Button
          className="w-full bg-gold hover:bg-gold/90 text-black"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </PageContainer>
  );
};

export default CheckoutPage;
