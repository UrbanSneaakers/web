import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const useFeaturedSneakers = () => {
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);

        // Trae solo los productos destacados
        const { data: rows, error: err } = await supabase
          .from("products_with_availability")
          .select(`
            id, name, brand, category, price, image_url, description, color, created_at, is_featured, is_active,
            product_inventory ( size, stock )
          `)
          .eq("is_available", true)
          .eq("is_featured", true);

        if (err) throw err;

        // Mapea a tu formato de producto
        const items = (rows ?? []).map((p) => {
          const availableSizes = (p.product_inventory ?? [])
            .filter((x) => (x.stock ?? 0) > 0)
            .map((x) => x.size)
            .sort((a, b) => a - b);

          return {
            id: String(p.id),
            name: p.name,
            brand: p.brand,
            price: Number(p.price),
            imageUrlString: p.image_url,
            description: p.description,
            sizes: availableSizes,
            available: availableSizes.length > 0,
            color: p.color,
            created_at: p.created_at,
            isFeatured: !!p.is_featured,
          };
        });

        setFeatured(items);
      } catch (err) {
        console.error("Error cargando featured sneakers:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { featured, loading, error };
};
