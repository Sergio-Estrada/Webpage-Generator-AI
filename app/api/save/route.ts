import { NextResponse } from 'next/server';
import { saveWebsite } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { schema } = await req.json();

    if (!schema || !schema.siteTitle) {
      return NextResponse.json(
        { error: 'El esquema de la página es inválido.' },
        { status: 400 }
      );
    }

    const cleanName = schema.siteTitle
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const uniqueSlug = `${cleanName}-${Math.random().toString(36).substring(2, 7)}`;

    const savedRecord = await saveWebsite(uniqueSlug, schema);

    return NextResponse.json(
      {
        slug: uniqueSlug,
        publicUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/site/${uniqueSlug}`,
        data: savedRecord,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error interno al guardar en la base de datos.' },
      { status: 500 }
    );
  }
}
