import React, { useRef } from 'react';

function CategoryButtons({ onCategorySelect }) {
  const scrollContainerRef = useRef(null);

  const categories = [
    { id: 'SAL', name: '샐러드' },
    { id: 'PKE', name: '포케' },
    { id: 'SAN', name: '샌드위치' },
    { id: 'COF', name: '카페' },
    { id: 'PAS', name: '파스타' },
    { id: 'BAB', name: '키토김밥' },
    // 더 많은 카테고리 추가 가능
  ];

  const handleMouseDown = (e) => {
    e.preventDefault();
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.isDown = true;
    scrollContainer.startX = e.pageX || e.touches[0].pageX;
    scrollContainer.scrollLeftStart = scrollContainer.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.isDown = false;
  };

  const handleMouseMove = (e) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer.isDown) return;
    e.preventDefault(); // 기본 드래그 동작 방지
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - scrollContainer.startX); // 이동 거리 계산
    scrollContainer.scrollLeft = scrollContainer.scrollLeftStart - walk;
  };



  return (
    <div
      className="category-buttons"
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUpOrLeave}
      onMouseUp={handleMouseUpOrLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUpOrLeave}
      onTouchMove={handleMouseMove}
    >
      {categories.map((category) => (
        <button
          key={category.id}
          className="category-button"
          onClick={() => onCategorySelect(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryButtons;


