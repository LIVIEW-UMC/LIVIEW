import { useState, useEffect, useRef } from 'react';
import { NAVER_MAP_CLIENT_ID, NAVER_MAP_CLIENT_SECRET } from '../../config/apiKeys';
import colors from '../../styles/colors';

function MapArea({ metadataList, slideIndex }) {
  const { naver } = window;
  const routeMapRef = useRef(null);
  const [routeLatLng, setRouteLatLng] = useState([]);

  const defaultIcon = (item, tf) => ({
    content: `<div style="display: flex; gap: 4px; background-color: white; border-radius: 40px; justify-content: center; align-items: center; padding: 4px 8px; border: 2px solid black; width: max-content;">
    <svg width='13' height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.00004 0C3.58146 0 0 3.7189 0 8.30706C0 10.2856 0.669992 12.0997 1.78326 13.5258C2.14211 13.9847 2.74245 14.7074 3.05538 15.2015C4.85725 18.044 7.16889 22.1721 7.84255 25.5599C7.95813 26.1384 8.09744 26.1485 8.24742 25.5787C8.72791 23.752 9.97408 19.7607 12.5476 15.5844C12.8545 15.0863 13.4767 14.3893 13.8629 13.9553C14.4224 13.3262 14.888 12.6059 15.2418 11.8206C15.7242 10.7493 16 9.56339 16 8.30804C16 3.71935 12.4185 0 8.00004 0ZM8.00004 12.7953C5.53382 12.7953 3.53459 10.7194 3.53459 8.15851C3.53459 5.59808 5.53382 3.52222 8.00004 3.52222C10.4663 3.52222 12.4655 5.59817 12.4655 8.15851C12.4655 10.7195 10.4663 12.7953 8.00004 12.7953Z"
      fill=${tf ? 'red' : colors.mainColor}
    />
  </svg><div style="font-size: 14px">${item.title}</div></div>`,
  });

  // 지도 저장하기 버튼이 눌리면 지도 생성 및 장소를 이을 경로를 받아옴
  useEffect(() => {
    const mapOptions = {
      zoom: 15,
      zoomControl: false,
    };
    routeMapRef.current = new naver.maps.Map('routeMap', mapOptions);

    const bounds = new naver.maps.LatLngBounds();

    // 날짜 오름차순(과거 -> 현재)으로 정렬
    const sortedMetadataList = metadataList;
    // 마커 생성
    for (let i = 0; i < sortedMetadataList.length; i++) {
      const latLng = new naver.maps.LatLng(sortedMetadataList[i].latitude, sortedMetadataList[i].longitude);
      bounds.extend(latLng);

      new naver.maps.Marker({
        position: latLng,
        map: routeMapRef.current,
        icon: defaultIcon(sortedMetadataList[i], i === slideIndex),
        animation: naver.maps.Animation.DROP,
      });
    }
    routeMapRef.current.fitBounds(bounds);
  }, [metadataList]);

  useEffect(() => {
    const sortedMetadataList = metadataList;

    // 출발지, 목적지, 경유지 정보
    const startString = `${sortedMetadataList[0].longitude},${sortedMetadataList[0].latitude}`;
    const goalString = `${sortedMetadataList[sortedMetadataList.length - 1].longitude},${sortedMetadataList[sortedMetadataList.length - 1].latitude}`;
    let waypointsString = '';
    for (let i = 1; i < sortedMetadataList.length - 1; i++) {
      waypointsString = waypointsString.concat(sortedMetadataList[i].longitude, ',', sortedMetadataList[i].latitude, '|');
    }
    waypointsString = waypointsString.slice(0, -1);

    // 출발지에서부터 경유지를 거쳐 목적지로 이동하는 경로의 위도, 경도를 받아옴
    const url = `/api/route/map-direction${
      sortedMetadataList.length <= 7 ? '' : '-15'
    }/v1/driving?start=${startString}&goal=${goalString}&waypoints=${waypointsString}`;
    const headers = {
      'X-NCP-APIGW-API-KEY-ID': NAVER_MAP_CLIENT_ID,
      'X-NCP-APIGW-API-KEY': NAVER_MAP_CLIENT_SECRET,
    };
    const option = {
      method: 'GET',
      headers,
    };

    fetch(url, option)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        setRouteLatLng(data.route.traoptimal[0].path.map((innerArr) => new naver.maps.LatLng(innerArr.reverse()[0], innerArr[1])));
      })
      .catch((err) => {
        console.error('경로 fetch 에러 발생:', err);
      });
  }, []);

  // 경로 정보가 받아와지면 해당 경로로 폴리라인을 그림
  useEffect(() => {
    if (routeLatLng.length === 0) {
      return;
    }

    new naver.maps.Polyline({
      map: routeMapRef.current,
      path: routeLatLng,
      fillColor: '#E16E79',
      fillOpacity: 0.3,
      strokeColor: '#E16E79',
      strokeOpacity: 1,
      strokeWeight: 3,
    });
  }, [routeLatLng, metadataList]);

  return <div id="routeMap" style={{ width: ' 600px', height: '849px', aspectRatio: 1 }} />;
}

export default MapArea;
