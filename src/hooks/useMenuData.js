// hooks/useMenuData.js
// DEPRECADO: Usa useNavItems() y useDropdownMenu(slug) en su lugar
import { useNavItems } from './useNavItems';

const useMenuData = () => {
  // Para mantener compatibilidad, convertimos nav items al formato anterior
  const { items, loading, error } = useNavItems();

  // Convierte array de items a objeto { slug: label }
  const menu = {};
  if (items) {
    items.forEach((item) => {
      menu[item.slug] = item.label;
    });
  }

  return { menu, loading, error };
};

export default useMenuData;
