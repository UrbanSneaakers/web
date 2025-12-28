import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const useNavItems = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        setLoading(true);

        // Carga desde nav_items tabla
        const { data: navItemsData, error: navErr } = await supabase
          .from("nav_items")
          .select("slug, label, sort, rule_type, rule_value, show_in_nav")
          .eq("show_in_nav", true)
          .order("sort", { ascending: true });

        if (navErr) throw navErr;

        // Mapea los datos a formato esperado
        const mappedItems = (navItemsData || []).map((item) => ({
          slug: item.slug,
          label: item.label,
          position: item.sort,
          rule_type: item.rule_type,
          rule_value: item.rule_value,
        }));

        setItems(mappedItems);
      } catch (err) {
        console.error("Error cargando nav items:", err);
        setError(err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNavItems();
  }, []);

  return { items, loading, error };
};
