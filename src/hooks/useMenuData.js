// hooks/useMenuData.js
import { useJsonFetcher } from './useJsonFetcher';

const useMenuData = () => {
  const { data: menu, loading, error } = useJsonFetcher('https://xagdiwboezbkbxfyzebq.supabase.co/storage/v1/object/public/json/data/navbar_menu.json');

  return { menu, loading, error };
};

export default useMenuData;
