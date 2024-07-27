import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('http://your-django-backend/check-payment-status/', req.body);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to check payment status' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
