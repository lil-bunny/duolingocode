import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    console.log("babar bichi");
    const response = await axios.get(
      'https://1661-150-129-64-107.ngrok-free.app/load_data/amit',
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('Load Data Proxy Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Proxy Error' }, { status: 500 });
  }
}