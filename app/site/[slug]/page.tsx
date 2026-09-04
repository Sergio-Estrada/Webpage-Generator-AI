import React from 'react';
import { getWebsiteBySlug } from '@/lib/db';
import Renderer from '@/components/Renderer';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const schema = await getWebsiteBySlug(params.slug);
  if (!schema) return { title: 'Sitio No Encontrado' };

  return {
    title: schema.siteTitle,
    description: `Página web oficial de ${schema.siteTitle}`,
  };
}

export default async function PublicSitePage({ params }: PageProps) {
  const schema = await getWebsiteBySlug(params.slug);

  if (!schema) {
    notFound();
  }

  return <Renderer schema={schema} />;
}
