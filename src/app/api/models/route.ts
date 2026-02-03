import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:11434/api/tags');
    const data = await response.json();
    
    const models = data.models.map((model: any) => ({
      name: model.name,
      size: model.size,
      modified_at: model.modified_at
    }));
    
    return NextResponse.json({ models });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
  }
}