import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { uid, message }: { uid: string; message: string } = await request.json();

    if (!uid || !message) {
      return NextResponse.json({ error: 'Missing uid or message' }, { status: 400 });
    }

    const response = await axios.post(
      'https://1661-150-129-64-107.ngrok-free.app/chat',
      { uid, message },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('Proxy Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Proxy Error' }, { status: 500 });
  }
}