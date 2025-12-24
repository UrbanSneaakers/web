import { useJsonFetcher } from './useJsonFetcher';

export const useSneaakers = () => {
  const { data: sneaakers, loading, error } = useJsonFetcher('https://xagdiwboezbkbxfyzebq.supabase.co/storage/v1/object/public/json/data/sneaakersv2.json');

  return { sneaakers, loading, error };
};