import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ping: "pong", time: new Date().toISOString() });
}

export async function GET() {
  return NextResponse.json({ ping: "pong", time: new Date().toISOString() });
}
