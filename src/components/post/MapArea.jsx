import { useState, useEffect, useRef } from 'react';

function MapArea() {
  const { naver } = window;

  const [currentLocation, setCurrentLocation] = useState(''); // 현재 위치

  const mapRef = useRef(null);

  // 현재 위치를 가져오는 함수, 성공 시 currentLocation를 현재 위치로, 실패 시 기본 위치로 설정
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setCurrentLocation({
            latitude: 37.3595704,
            longitude: 127.105399,
          });
        },
      );
    }
  };

  // 컴포넌트가 처음 렌더링될 때 메타데이터, 현재 위치를 가져옴
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // 현재 위치 또는 사진의 메타데이터 위치로 지도 생성
  useEffect(() => {
    if (!currentLocation) {
      return;
    }

    const location = new naver.maps.LatLng(currentLocation.latitude, currentLocation.longitude);

    const mapOptions = {
      center: location,
      zoom: 15,
      zoomControl: false,
    };
    mapRef.current = new naver.maps.Map('map', mapOptions);
  }, [currentLocation]);

  return <div id="map" style={{ width: ' 600px', height: '849px', aspectRatio: 1 }} />;
}

export default MapArea;
