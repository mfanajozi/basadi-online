import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto-js';

const ikhokhaWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Verify the signature
      const appId = req.headers['ik-appid'];
      const signature = req.headers['ik-sign'];
      const appSecret = process.env.IKHOKHA_APP_SECRET;

      if (!appId || !signature || !appSecret) {
        console.error('Missing headers or secret');
        return res.status(400).json({ message: 'Missing headers or secret' });
      }

      const requestBody = JSON.stringify(req.body);

      const expectedSignature = crypto.HmacSHA256(requestBody, appSecret.trim()).toString(crypto.enc.Hex);

      if (signature !== expectedSignature) {
        console.error('Invalid signature');
        return res.status(401).json({ message: 'Invalid signature' });
      }

      // Process the webhook data
      const { paylinkID, status, externalTransactionID, responseCode } = req.body;

      console.log('iKhokha Webhook received:', {
        paylinkID,
        status,
        externalTransactionID,
        responseCode,
      });

      // TODO: Update your database with the payment status

      // Respond to iKhokha
      res.status(200).json({ message: 'Webhook received' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        console.error('Error processing webhook:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default ikhokhaWebhook;
