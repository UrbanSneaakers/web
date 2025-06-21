import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useSneaakers = () => {
  const [sneaakers, setSneaakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSneaakers = async () => {
      const { data, error } = await supabase.from('Sneaakers').select('*');
      if (error) console.error(error);
      else setSneaakers(data);
      setLoading(false);
    };

    fetchSneaakers();
  }, []);

  return { sneaakers, loading };
};
