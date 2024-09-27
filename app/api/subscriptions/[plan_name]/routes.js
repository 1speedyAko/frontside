import { NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

export async function POST(request, { params }) {
  const { plan_name } = params;
  const token =  getToken({req: request})
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/create/${plan_name}/`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token.access}`,
        },
      }
    );

    return NextResponse.json({ checkout_url: response.data.payment_url }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
