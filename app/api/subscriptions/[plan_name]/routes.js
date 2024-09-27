import { NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

export async function POST(request, { params }) {
  const { plan_name } = params;

  // Retrieve token from request or cookies
  const token = await getToken({ req: request });

  // If no token, return unauthorized error
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Make a POST request to your Django API to create the subscription payment
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/create/${plan_name}/`,
      {}, // empty payload
      {
        headers: {
          'Authorization': `Bearer ${token.accessToken}`, // Pass the token in the headers
          'Content-Type': 'application/json',
        },
      }
    );

    // If payment URL is returned, send it to the frontend
    if (response.data.payment_url) {
      return NextResponse.json({ payment_url: response.data.payment_url }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Payment initiation failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
