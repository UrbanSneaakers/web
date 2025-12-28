import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const useUnifiedData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: rows, error } = await supabase
          .from("products_with_availability")
          .select(`
            id, name, brand, category, price, image_url, description, color, created_at, is_featured, is_active,
            product_inventory ( size, stock )
          `)
          .eq("is_available", true);

        if (error) throw error;

        // Convertimos a tu formato viejo: { Mujer: { Nike: [ ... ] }, Hombre: { ... } }
        const shaped = {};
        for (const p of rows ?? []) {
          const category = p.category ?? "SinCategoria";
          const brand = p.brand ?? "SinMarca";

          const availableSizes = (p.product_inventory ?? [])
            .filter(x => (x.stock ?? 0) > 0)
            .map(x => x.size)
            .sort((a, b) => a - b);

          const item = {
            id: String(p.id),
            name: p.name,
            brand: p.brand,
            price: Number(p.price),
            imageUrlString: p.image_url,
            description: p.description,
            sizes: availableSizes,
            available: availableSizes.length > 0,          // derivado
            color: p.color,
            created_at: p.created_at,
            isFeatured: !!p.is_featured
          };

          shaped[category] ??= {};
          shaped[category][brand] ??= [];
          shaped[category][brand].push(item);
        }

        // opcional: ordenar cada lista (featured primero)
        for (const cat of Object.keys(shaped)) {
          for (const br of Object.keys(shaped[cat])) {
            shaped[cat][br].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
          }
        }

        setData(shaped);
      } catch (err) {
        console.error("Error cargando datos desde Supabase:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
