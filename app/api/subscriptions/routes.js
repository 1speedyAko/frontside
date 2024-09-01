// app/api/subscriptions/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';

const DJANGO_API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

export async function GET(request) {
  const accessToken = request.headers.get('Authorization').split(' ')[1];

  const response = await axios.get(`${DJANGO_API_URL}/subscriptions/user-subscription/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return NextResponse.json(response.data);
}
