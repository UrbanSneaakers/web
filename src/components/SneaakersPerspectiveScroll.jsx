import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useSneaakers } from '../hooks/useSneaakers';
import '../styles/SneaakersPerspectiveScroll.css';

const SneaakersPerspectiveScroll = forwardRef((props, ref) => {
  const { sneaakers, loading } = useSneaakers();
  const containerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Exponer el contenedor scrollable al padre
  useImperativeHandle(ref, () => containerRef.current);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      setContainerWidth(container.offsetWidth);
      setScrollX(container.scrollLeft);
    };

    requestAnimationFrame(update);

    const onScroll = () => {
      setScrollX(container.scrollLeft);
    };

    container.addEventListener('scroll', onScroll);
    window.addEventListener('resize', update);

    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [sneaakers]);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando tenis...</p>;

  const minScale = 0.45;
  const maxScale = 1.0;
  const itemWidth = 428;

  return (
    <div className="scroll-wrapper">
      <div className="scroll-container" ref={containerRef}>
        {sneaakers.map((s, index) => {
          const itemLeft = index * itemWidth;
          const itemCenter = itemLeft + itemWidth / 2;
          const containerCenter = scrollX + containerWidth / 2;
          const distance = Math.abs(containerCenter - itemCenter);

          const scale =
            minScale + (maxScale - minScale) * Math.exp(-distance / 400);

          return (
            <div
              key={s.id}
              className="scroll-item"
              style={{
                transform: `scale(${scale})`,
                zIndex: Math.round(scale * 100),
              }}
            >
              <img src={s.imageUrlString} alt={s.name} />
              <div className="info">
                <h3>{s.name}</h3>
                <p>Marca: {s.brand}</p>
                <p>
                  <strong>${s.price}</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default SneaakersPerspectiveScroll;
