/**
 * REFACTOR: Nuevos Hooks Separados
 * 
 * Se ha realizado una refactorización de la arquitectura de datos para escalar
 * con la nueva estructura de nav_items + reglas + colecciones.
 * 
 * HOOKS NUEVOS:
 * 
 * 1) useNavItems()
 *    - Trae items del navbar desde tabla nav_items
 *    - Devuelve: { items, loading, error }
 *    - items[]: { slug, label, position, rule_type }
 *    - Se usa en: Navbar.jsx para pintar los botones del menú
 * 
 * 2) useDropdownMenu(hoveredSlug)
 *    - Llama RPC get_dropdown_for_nav(nav_slug)
 *    - Resuelve la regla (audience o collection)
 *    - Devuelve productos ya seccionados
 *    - Devuelve: { dropdown, loading, error }
 *    - Se usa en: Navbar.jsx para llenar el dropdown dinámicamente
 *    - Ejemplo de respuesta:
 *      Para "Mujer" con rule_type='audience':
 *        { "Mujer": [...products], "Unisex": [...products] }
 *      Para "Nike" con rule_type='collection':
 *        { "Nike": [...products] }
 * 
 * 3) useFeaturedSneakers()
 *    - Trae SOLO productos con is_featured=true
 *    - Devuelve: { featured, loading, error }
 *    - featured[]: { id, name, brand, price, imageUrlString, sizes, ... }
 *    - Se usa en: PopularSneakersGallery, home page
 *    - No está mezclado con el navbar
 * 
 * HOOKS MODIFICADOS:
 * 
 * - useSneaakers(): Ahora es un wrapper de useFeaturedSneakers()
 *   para mantener compatibilidad con código existente
 * 
 * - useMenuData(): Ahora usa useNavItems() en lugar de useUnifiedData()
 *   DEPRECADO: Usar directamente useNavItems() en componentes nuevos
 * 
 * HOOKS ANTIGUOS:
 * 
 * - useUnifiedData(): Se mantiene para componentes de detalle
 *   (CategoryDetail, SneaakerDetail, etc.) que necesitan buscar
 *   un producto específico por ID/categoría/marca
 *   NO se debe usar para navbar o featured
 * 
 * ARQUITECTURA CLARA:
 * 
 *   Navbar
 *   ├─ useNavItems()      → pinta botones (slug, label)
 *   └─ useDropdownMenu()  → RPC con regla → { seccion: [products] }
 * 
 *   Home/Gallery
 *   └─ useFeaturedSneakers() → [featured products]
 * 
 *   Detail Pages (Sneaker, Category, Brand)
 *   └─ useUnifiedData()   → { categoria: { marca: [products] } }
 * 
 * PROXIMOS PASOS:
 * 
 * 1. Crear RPC get_dropdown_for_nav en Supabase (ver especificación abajo)
 * 2. Actualizar queries/vistas si es necesario
 * 3. Probar el dropdown con datos reales
 * 
 * RPC ESPERADO: get_dropdown_for_nav(nav_slug)
 * 
 *   Pseudocódigo:
 *   
 *   CREATE OR REPLACE FUNCTION get_dropdown_for_nav(nav_slug TEXT)
 *   RETURNS JSON AS $$
 *   BEGIN
 *     DECLARE rule_data RECORD;
 *     BEGIN
 *       SELECT rule_type, rule_value INTO rule_data
 *       FROM nav_items WHERE slug = nav_slug;
 *       
 *       IF rule_data.rule_type = 'audience' THEN
 *         -- Retorna products agrupados por audience
 *         RETURN (SELECT jsonb_object_agg(
 *           COALESCE(p.audience, 'Unisex'),
 *           jsonb_agg(p)
 *         )
 *         FROM products_with_availability p
 *         WHERE (p.audience = rule_data.rule_value OR p.audience = 'Unisex')
 *         AND p.is_available = true);
 *       
 *       ELSIF rule_data.rule_type = 'collection' THEN
 *         -- Retorna products agrupados por brand
 *         RETURN (SELECT jsonb_object_agg(
 *           p.brand,
 *           jsonb_agg(p)
 *         )
 *         FROM products_with_availability p
 *         JOIN product_collections pc ON p.id = pc.product_id
 *         JOIN collections c ON pc.collection_id = c.id
 *         WHERE c.slug = rule_data.rule_value
 *         AND p.is_available = true);
 *       
 *       END IF;
 *       
 *       RETURN '{}'::json;
 *     END;
 *   END;
 *   $$ LANGUAGE plpgsql;
 */
