import { useFeaturedSneakers } from './useFeaturedSneakers';

export const useSneaakers = () => {
  // Ahora useSneaakers es un simple wrapper de useFeaturedSneakers
  // para mantener compatibilidad con el código existente
  const { featured, loading, error } = useFeaturedSneakers();

  return { sneaakers: featured, loading, error };
};