import { createClient } from '@supabase/supabase-js';
import { WebsiteSchema } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveWebsite(slug: string, schema: WebsiteSchema) {
  const { data, error } = await supabase
    .from('websites')
    .insert([
      {
        slug: slug,
        schema_data: schema,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    throw new Error(`Error al guardar la página web: ${error.message}`);
  }

  return data[0];
}

export async function getWebsiteBySlug(slug: string): Promise<WebsiteSchema | null> {
  const { data, error } = await supabase
    .from('websites')
    .select('schema_data')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data.schema_data as WebsiteSchema;
}
