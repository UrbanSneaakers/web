import { useUnifiedData } from './useUnifiedData';

export const useSneaakers = () => {
  const { data, loading, error } = useUnifiedData();

  const sneaakers = data?.sneakers?.filter(s => s.isFeatured) || [];

  return { sneaakers, loading, error };
};