// SneaakersPerspectiveScroll.jsx
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useSneaakers } from '../hooks/useSneaakers';
import '../styles/SneaakersPerspectiveScroll.css';

const SneaakersPerspectiveScroll = forwardRef((_, ref) => {
  const { sneaakers, loading } = useSneaakers();
  const containerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const itemWidth = 428; // 420 + 8
  const cloneCount = 2;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      setContainerWidth(container.offsetWidth);
      setScrollX(container.scrollLeft);
    };

    requestAnimationFrame(update);

    const onScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollLeft + sneaakers.length * itemWidth;
        return;
      }

      if (container.scrollLeft >= maxScroll - itemWidth) {
        container.scrollLeft = container.scrollLeft - sneaakers.length * itemWidth;
        return;
      }

      setScrollX(container.scrollLeft);
    };

    container.addEventListener('scroll', onScroll);
    window.addEventListener('resize', update);

    // Centrar en el segundo elemento
    if (sneaakers.length > 0) {
      container.scrollLeft = itemWidth * cloneCount;
    }

    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [sneaakers]);

  useImperativeHandle(ref, () => containerRef.current);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando tenis...</p>;

  const minScale = 0.45;
  const maxScale = 1.0;

  const repeatedItems = [
    ...sneaakers.slice(-cloneCount),
    ...sneaakers,
    ...sneaakers.slice(0, cloneCount),
  ];

  return (
    <div className="scroll-wrapper">
      <div className="scroll-container" ref={containerRef}>
        {repeatedItems.map((s, index) => {
          const itemLeft = index * itemWidth;
          const itemCenter = itemLeft + itemWidth / 2;
          const containerCenter = scrollX + containerWidth / 2;
          const distance = Math.abs(containerCenter - itemCenter);

          const scale = minScale + (maxScale - minScale) * Math.exp(-distance / 400);

          return (
            <div
              key={`${s.id}-${index}`}
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
