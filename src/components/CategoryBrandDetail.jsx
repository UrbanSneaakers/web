import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { supabase } from '../lib/supabaseClient';
import SneaakerCard from './SneaakerCard';

const CategoryBrandDetail = () => {
  const { category, brand } = useParams(); // category es ahora navSlug
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navLabel, setNavLabel] = useState(category);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Primero obtén el label del nav item para mostrar en la UI
        const { data: navItem } = await supabase
          .from('nav_items')
          .select('label')
          .eq('slug', category)
          .single();

        if (navItem) {
          setNavLabel(navItem.label);
        }

        // Llama al RPC con navSlug y brand
        const { data, error: rpcErr } = await supabase.rpc(
          'get_products_for_nav_brand',
          {
            nav_slug: category,
            brand_in: brand,
          }
        );

        if (rpcErr) throw rpcErr;

        // Mapea los datos al formato de producto esperado
        const mappedProducts = (data || []).map((p) => {
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

        setSneakers(mappedProducts);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (category && brand) {
      fetchProducts();
    }
  }, [category, brand]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Tenis {brand} de {navLabel}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        {sneakers.map((s) => (
          <SneaakerCard key={s.id} sneaker={s} />
        ))}
      </div>
      {sneakers.length === 0 && <p>No hay sneakers disponibles para esta categoría y marca.</p>}
    </div>
  );
};

export default CategoryBrandDetail;