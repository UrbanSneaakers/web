import { createClient } from '@supabase/supabase-js';

// Información obtenida de app.supabase.com > Project Settings > API
const supabaseUrl = 'https://pfuyelnqddlasscsnkfj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdXllbG5xZGRsYXNzY3Nua2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyODUzNDIsImV4cCI6MjA2NTg2MTM0Mn0.O3Z2z92tlADwcqEM27jNQNPhLXRIdnR-0mQ1nu0fUS4';

export const supabase = createClient(supabaseUrl, supabaseKey);
