import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Map.css';
import SearchBar from './SearchBar';
import CategoryButtons from './CategoryButton';

function MapContainer() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [lastCenter, setLastCenter] = useState({ lat: 37.5665, lng: 126.9780 }); // 초기 지도 위치 : 서울
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_APPKEY}&libraries=services&autoload=false`;
    kakaoMapScript.async = true; //비동기적 로드 
    
    //sdk 사용 가능성 체크
    kakaoMapScript.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const initialCenter = new window.kakao.maps.LatLng(37.5665, 126.9780);
          const options = {
            center: initialCenter,
            level: 3,
          };
          const mapInstance = new window.kakao.maps.Map(mapContainer.current, options);
          setMap(mapInstance);

          //현재위치
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const currentPosition = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
              mapInstance.setCenter(currentPosition);
              setLastCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
            }, (err) => {
              console.error("Geolocation access denied: " + err.message);
            });
          }
        });
      } else {
        console.error('Kakao Maps SDK is not available');
      }
    };

    document.head.appendChild(kakaoMapScript);
    
    //컴포넌트 언마운트시 실행
    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, []);

  const handleSearch = (keyword) => {
    if (!map) return;
    // 기존 마커 제거
    markers.forEach(marker => {
      if (marker && marker.setMap) {
        marker.setMap(null);
      }
    });
    setMarkers([]);

    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          updateMarkers(data);
        } else {
          alert('검색 결과가 없습니다.');
        }
      }, {
        location: map.getCenter(),
        radius: 5000 //5000미터 반경 내 검색
      });
    } else {
      console.error('Kakao Maps Services is not available');
    }
  };

  const updateMarkers = (data) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    
    //데이터가 있는 장소 마커 생성
    const newMarkers = data.map(place => {
      const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
      });

      //infowindow 창 생성
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div class="info-window">
                    <div class="title">${place.place_name}</div>
                    <div>${place.address_name}</div>
                  </div>`
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        newMarkers.forEach(m => m.infoWindow.close());
        infoWindow.open(map, marker);
      });

      //마커 위치 bounds에 추가 + newMarkers 배열에 포함
      bounds.extend(markerPosition);
      return {
        marker,
        infoWindow,
        name: place.place_name,
        address: place.address_name
      };
    });

    //마커 상태 업데이트 + 지도 범위를 bounds로 설정
    setMarkers(newMarkers);
    map.setBounds(bounds);

    //지도 클릭 시 모든 인포창 닫기 
    window.kakao.maps.event.addListener(map, 'click', () => {
      newMarkers.forEach(m => m.infoWindow.close());
    });

    // 지도 중심 업데이트
    const center = map.getCenter();
    setLastCenter({ lat: center.getLat(), lng: center.getLng() });
  };

   //마커의 이름과 주소 정보를 저장하여 전달
  const handleRecommendationClick = () => {
    const markerData = markers.map(markerObj => ({
      name: markerObj.name,
      address: markerObj.address
    }));

    console.log('Navigating to recommendations with markers:', markerData);
    navigate('/recommendations', { state: { markers: markerData } });
  };

  // 지도 보기 버튼 클릭 시 마커 제거 및 마지막 위치로 복원
  const handleMapViewClick = () => {
    markers.forEach(markerObj => {
      if (markerObj.marker && markerObj.marker.setMap) {
        markerObj.marker.setMap(null);
      }
    });
    setMarkers([]);
    if (map) {
      const moveLatLng = new window.kakao.maps.LatLng(lastCenter.lat, lastCenter.lng);
      map.setCenter(moveLatLng);
    }
    navigate('/'); // 기본 경로로 이동
  };

  return (
    <div className="map-wrapper">
      <div className="map-container" ref={mapContainer}>
        <SearchBar onSearch={handleSearch} />
        <CategoryButtons onCategorySelect={handleSearch} />
        <button onClick={handleRecommendationClick} className="recommendation-button">
          리스트 목록
        </button>
        <button onClick={handleMapViewClick} className="back-to-main-button">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" /> 
        </button>
      </div>
    </div>
  );
}

export default MapContainer;
