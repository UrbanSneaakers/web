import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const useDropdownMenu = (hoveredSlug) => {
  const [dropdown, setDropdown] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hoveredSlug) {
      setDropdown({});
      return;
    }

    const fetchDropdownMenu = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Cargando dropdown para:", hoveredSlug);

        // Fallback: obtén la regla de nav_items y busca según eso
        const { data: navItem, error: navErr } = await supabase
          .from("nav_items")
          .select("rule_type, rule_value")
          .eq("slug", hoveredSlug)
          .single();

        if (navErr) {
          console.error("Error obteniendo nav_items:", navErr);
          setError(navErr);
          setDropdown({});
          return;
        }

        if (!navItem) {
          console.warn("Nav item no encontrado para slug:", hoveredSlug);
          setDropdown({});
          return;
        }

        console.log("Nav item encontrado:", navItem);

        const { rule_type, rule_value } = navItem;
        let rows = [];

        if (rule_type === "audience") {
          console.log("Buscando productos por audience:", rule_value);
          // Filtra por audience + Unisex
          const { data: audienceData, error: audienceErr } = await supabase
            .from("products_with_availability")
            .select(`
              id, name, brand, category, price, image_url, description, color, created_at, is_featured, is_active, audience,
              product_inventory ( size, stock )
            `)
            .eq("is_available", true)
            .in("audience", [rule_value, "Unisex"]);

          if (audienceErr) {
            console.error("Error buscando productos por audience:", audienceErr);
            throw audienceErr;
          }
          rows = audienceData || [];
          console.log("Productos encontrados:", rows.length);
        } else if (rule_type === "collection") {
          console.log("Buscando productos por collection:", rule_value);
          // Para colecciones, primero busca la colección
          const { data: collectionData, error: collectionErr } = await supabase
            .from("collections")
            .select("id")
            .eq("slug", rule_value)
            .single();

          if (collectionErr) {
            console.error("Collection no encontrada:", rule_value);
            setDropdown({});
            return;
          }

          // Ahora busca productos de esa colección
          const { data: productCollData, error: productCollErr } = await supabase
            .from("product_collections")
            .select("product_id")
            .eq("collection_id", collectionData.id);

          if (productCollErr) {
            console.error("Error buscando product_collections:", productCollErr);
            throw productCollErr;
          }

          const productIds = productCollData?.map(pc => pc.product_id) || [];
          console.log("Product IDs en colección:", productIds);

          if (productIds.length > 0) {
            const { data: collectionProducts, error: collectionProductsErr } = await supabase
              .from("products_with_availability")
              .select(`
                id, name, brand, category, price, image_url, description, color, created_at, is_featured, is_active,
                product_inventory ( size, stock )
              `)
              .in("id", productIds)
              .eq("is_available", true);

            if (collectionProductsErr) {
              console.error("Error buscando productos de colección:", collectionProductsErr);
              throw collectionProductsErr;
            }
            rows = collectionProducts || [];
            console.log("Productos en colección:", rows.length);
          }
        }

        // Agrupa por brand
        const grouped = {};
        rows.forEach((p) => {
          const brand = p.brand || "Sin Marca";
          if (!grouped[brand]) grouped[brand] = [];

          const availableSizes = (p.product_inventory ?? [])
            .filter(x => (x.stock ?? 0) > 0)
            .map(x => x.size)
            .sort((a, b) => a - b);

          grouped[brand].push({
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
          });
        });

        // Ordena por featured
        Object.keys(grouped).forEach((brand) => {
          grouped[brand].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
        });

        console.log("Dropdown agrupado:", grouped);
        setDropdown(grouped);
      } catch (err) {
        console.error("Error cargando dropdown para", hoveredSlug, err);
        setError(err);
        setDropdown({});
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownMenu();
  }, [hoveredSlug]);

  return { dropdown, loading, error };
};
