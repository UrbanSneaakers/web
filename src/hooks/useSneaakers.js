import { useUnifiedData } from './useUnifiedData';

export const useSneaakers = () => {
  const { data, loading, error } = useUnifiedData();

  const allSneakers = [];
  if (data) {
    Object.values(data).forEach(category => {
      Object.values(category).forEach(brandArray => {
        if (Array.isArray(brandArray)) {
          allSneakers.push(...brandArray);
        }
      });
    });
  }

  const sneaakers = allSneakers.filter(s => s.isFeatured);

  return { sneaakers, loading, error };
};