import { NextResponse } from 'next/server';
import { getSiteData, updateSiteData } from '@/lib/db';

export async function GET() {
  try {
    const data = getSiteData();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updated = updateSiteData(body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
