import { NextResponse } from 'next/server';

// Server-side storage
let serverToolsStorage: any[] = [];

export async function GET() {
  return NextResponse.json(serverToolsStorage);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    serverToolsStorage = data;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update tools' }, { status: 500 });
  }
}