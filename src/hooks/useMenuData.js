// hooks/useMenuData.js
import { useUnifiedData } from './useUnifiedData';

const useMenuData = () => {
  const { data, loading, error } = useUnifiedData();

  return { menu: data || {}, loading, error };
};

export default useMenuData;
