import { useEffect, useState } from 'react';

export const useSneaakers = () => {
  const [sneaakers, setSneaakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSneaakers = async () => {
      try {
        const response = await fetch('https://xagdiwboezbkbxfyzebq.supabase.co/storage/v1/object/public/json/data/sneaakers.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setSneaakers(data);
      } catch (err) {
        console.error('Error cargando los sneaakers:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSneaakers();
  }, []);

  return { sneaakers, loading, error };
};