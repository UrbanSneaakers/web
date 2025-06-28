import React, { useRef, useEffect, useState } from 'react';
import { useSneaakers } from '../hooks/useSneaakers';
import '../styles/SneaakersPerspectiveScroll.css';

const SneaakersPerspectiveScroll = () => {
  const { sneaakers, loading } = useSneaakers();
  const containerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      setContainerWidth(container.offsetWidth);
      setScrollX(container.scrollLeft);
    };

    // Asegura que el layout esté listo antes de medir
    requestAnimationFrame(() => {
      setTimeout(update, 0);
    });

    const onScroll = () => setScrollX(container.scrollLeft);

    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      container.classList.add('dragging');
      startX = e.pageX;
      scrollStart = container.scrollLeft;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.pageX - startX;
      container.scrollLeft = scrollStart - deltaX;
    };

    const onMouseUp = () => {
      isDragging = false;
      container.classList.remove('dragging');
    };

    container.addEventListener('scroll', onScroll);
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseleave', onMouseUp);
    window.addEventListener('resize', update);

    return () => {
      container.removeEventListener('scroll', onScroll);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mouseleave', onMouseUp);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando tenis...</p>;

  const minScale = 0.65;
  const maxScale = 1.0;
  const itemWidth = 320 + 48; // tarjeta + gap

  return (
    <div className="scroll-wrapper">
      <div className="scroll-container" ref={containerRef}>
        {sneaakers.map((s, index) => {
          const itemLeft = index * itemWidth;
          const itemCenter = itemLeft + itemWidth / 2;
          const containerCenter = scrollX + containerWidth / 2;
          const distance = Math.abs(containerCenter - itemCenter);

          const scale = minScale + (maxScale - minScale) * Math.exp(-distance / 300);

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
                <p><strong>${s.price}</strong></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SneaakersPerspectiveScroll;
