import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import crypto from 'crypto-js';

const OrderConfirmationPage = () => {
  const { items, clearCart, calculateFinalAmount } = useCart();
  const navigate = useNavigate();
  const [paymentLink, setPaymentLink] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const createPaymentLink = async () => {
      try {
        const amount = calculateFinalAmount() * 100; // Amount in cents
        const appId = process.env.IKHOKHA_APP_ID;
        const appSecret = process.env.IKHOKHA_APP_SECRET;

        if (!appId || !appSecret) {
          setError('Missing iKhokha credentials');
          return;
        }

        const request = {
          entityID: appId,
          externalEntityID: 'order-' + Date.now(),
          amount: amount,
          currency: 'ZAR',
          requesterUrl: window.location.origin,
          mode: 'live',
          externalTransactionID: 'txn-' + Date.now(),
          urls: {
            callbackUrl: `${window.location.origin}/api/ikhokha-webhook`,
            successPageUrl: `${window.location.origin}/order-confirmation`,
            failurePageUrl: `${window.location.origin}/order-confirmation?status=failure`,
            cancelUrl: `${window.location.origin}/menu`,
          },
        };

        const apiEndPoint = 'https://api.ikhokha.com/public-api/v1/api/payment';

        const createPayloadToSign = (urlPath: string, body = '') => {
          const parsedUrl = new URL(urlPath);
          const basePath = parsedUrl.pathname;
          return basePath + body;
        };

        const jsStringEscape = (str: string) => {
          return str.replace(/[\\"']/g, '\\$&');
        };

        const reqestbody = JSON.stringify(request);
        const payloadToSign = createPayloadToSign(apiEndPoint, reqestbody);

        const signature = crypto.HmacSHA256(payloadToSign, appSecret.trim()).toString(crypto.enc.Hex);

        const response = await fetch(apiEndPoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'IK-APPID': appId.trim(),
            'IK-SIGN': signature.trim(),
          },
          body: reqestbody,
        });

        const data = await response.json();

        if (response.ok) {
          setPaymentLink(data.paylinkUrl);
          // Redirect to payment link
          window.location.href = data.paylinkUrl;
        } else {
          setError(data.message || 'Failed to create payment link');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'An unexpected error occurred');
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    if (items.length > 0) {
      createPaymentLink();
    } else {
      navigate('/menu');
    }
  }, [items, navigate, clearCart, calculateFinalAmount]);

  return (
    <div>
      <h1>Order Confirmation</h1>
      {error && <p>Error: {error}</p>}
      {paymentLink ? (
        <p>Redirecting to payment...</p>
      ) : (
        <p>Creating payment link...</p>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
