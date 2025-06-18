import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { uid, message } = await request.json();

    if (!uid || !message) {
      return NextResponse.json({ error: 'Missing uid or message' }, { status: 400 });
    }

    const response = await axios.post(
      'https://1661-150-129-64-107.ngrok-free.app/chat',
      { uid, message },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return NextResponse.json( response.data);
  } catch (error: any) {
    console.error('Proxy Error:', error.message);
    return NextResponse.json({ error: error.message || 'Proxy Error' }, { status: 500 });
  }
}