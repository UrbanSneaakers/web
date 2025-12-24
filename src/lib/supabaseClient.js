import { createClient } from '@supabase/supabase-js';

// Información obtenida de app.supabase.com > Project Settings > API
const supabaseUrl = 'https://xagdiwboezbkbxfyzebq.supabase.co';
const supabaseKey = 'sb_publishable_aZPkr7su6fsBoKWB2iMk0Q_v1uTetBG';

export const supabase = createClient(supabaseUrl, supabaseKey);
