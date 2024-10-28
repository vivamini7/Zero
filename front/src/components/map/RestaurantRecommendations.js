import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Map.css';

function RestaurantRecommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const markers = location.state?.markers || [];

  console.log('Received markers:', markers);

  return (
    <div className="recommendations-container">
      <h2> 검색한 식당 리스트</h2>
      <ul>
        {markers.map((markerObj, index) => (
          <li key={index} className="recommendation-item">
            <h3>{markerObj.name}</h3>
            <p>{markerObj.address}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/map')} className="map-view-button">
        지도 보기
      </button>
    </div>
  );
}

export default RestaurantRecommendations;
