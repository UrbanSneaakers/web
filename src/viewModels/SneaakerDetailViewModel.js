import { useState } from 'react';

export const useSneaakerDetailViewModel = () => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return {
    selectedSize,
    handleSizeSelect,
  };
};