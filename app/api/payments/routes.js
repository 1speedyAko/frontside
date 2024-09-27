// app/api/payments/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';

const DJANGO_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request) {
  const data = await request.json();
  const token = request.headers.get('Authorization').split(' ')[1];

  const response = await axios.post(`${DJANGO_API_URL}/payments/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(response.data);
}
