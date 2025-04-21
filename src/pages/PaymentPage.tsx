import { PageContainer } from "@/components/layout/PageContainer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate payment processing
    setTimeout(() => {
      // Redirect to order confirmation page after successful payment
      navigate("/order-confirmation");
    }, 3000); // Simulate 3 seconds of payment processing
  }, [navigate]);

  return (
    <PageContainer title="Payment" showBackButton>
      <div className="container-custom">
        <h2>Simulated Payment Page</h2>
        <p>This is a simulated payment page. In a real application, this page would integrate with the iKhokha payment gateway.</p>
        <p>Redirecting to order confirmation page...</p>
      </div>
    </PageContainer>
  );
};

export default PaymentPage;
