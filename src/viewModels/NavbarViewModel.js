import { useState, useRef } from 'react';

export const useNavbarViewModel = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const hoverTimeout = useRef(null);

  const HOVER_EXIT_DELAY_MS = 100;
  const TRANSITION_DELAY_MS = 150;

  const cancelPendingClose = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const handleItemMouseEnter = (item) => {
    cancelPendingClose();

    if (hoveredItem && hoveredItem !== item) {
      setHoveredItem(null); // inicia fade-out
      setTimeout(() => setHoveredItem(item), TRANSITION_DELAY_MS); // luego cambia
    } else {
      setHoveredItem(item);
    }
  };

  const handleItemMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      if (!isHoveringDropdown) {
        setHoveredItem(null);
      }
    }, HOVER_EXIT_DELAY_MS);
  };

  const handleDropdownMouseEnter = () => {
    cancelPendingClose();
    setIsHoveringDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdown(false);
    setHoveredItem(null);
  };

  return {
    hoveredItem,
    handleItemMouseEnter,
    handleItemMouseLeave,
    handleDropdownMouseEnter,
    handleDropdownMouseLeave,
  };
};