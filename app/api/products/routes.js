// app/api/products/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';

const DJANGO_API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

export async function GET(request) {
  const response = await axios.get(`${DJANGO_API_URL}/products/`);

  return NextResponse.json(response.data);
}

export async function POST(request) {
  const data = await request.json();
  const accessToken = request.headers.get('Authorization').split(' ')[1];

  const response = await axios.post(`${DJANGO_API_URL}/products/`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return NextResponse.json(response.data);
}
