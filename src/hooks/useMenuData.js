// hooks/useMenuData.js
import { useEffect, useState } from 'react';

const useMenuData = () => {
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('https://pfuyelnqddlasscsnkfj.supabase.co/storage/v1/object/public/json-data//navbar_menu.json');
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error('Error cargando el menú:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return { menu, loading };
};

export default useMenuData;
