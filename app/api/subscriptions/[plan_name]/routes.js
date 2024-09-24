// app/api/subscriptions/[plan_name]/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from 'next-auth/jwt'; 

export async function POST(request, { params }) {
  const { plan_name } = params;

  // Retrieve JWT token from the request (adjust if you're using a custom header for tokens)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Forward the request to your backend with the required token and plan name
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/create/${plan_name}/`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token.access}`, // Ensure this matches your token structure
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      // Forward the checkout URL back to the client-side
      return NextResponse.json({ payment_url: response.data.payment_url }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Unable to create payment' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error initiating payment:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
