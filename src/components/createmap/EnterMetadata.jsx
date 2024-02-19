import { useState, useEffect, useRef } from 'react';
import exifr from 'exifr';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_MAP_CLIENT_ID, NAVER_MAP_CLIENT_SECRET, TMAP_APP_KEY } from '../../config/apiKeys';
import Check from '../../assets/icon/Check';
import BASE_URL from '../../config/baseUrl';

function EnterMetadata({ fileList, fileImgSrcList, thumbnailIdx, isClickedCreateMap, setIsClickedCreateMap, tourRequestDTO }) {
  const [metadataList, setMetadataList] = useState([]);
  const [emptyMetadataIdx, setEmptyMetadataIdx] = useState([]);

  const { naver } = window;
  const mapRef = useRef(null);
  const routeMapRef = useRef(null);

  const [poiList, setPoiList] = useState([]);

  const [currentLocation, setCurrentLocation] = useState(''); // 현재 위치

  const [idxBeingWritten, setIdxBeingWritten] = useState(0); // 날짜, 위치 정보를 작성하고 있는 사진의 index

  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchResult, setSearchResult] = useState([]); // 검색 API의 응답 받은 item 배열
  const [markers, setMarkers] = useState([]); // 생성된 마커 배열
  const [selectedMarker, setSelectedMarker] = useState(null); // 선택된 마커와 item 정보

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [routeLatLng, setRouteLatLng] = useState([]);

  /**
   * exifr을 통해 메타데이터를 가져오는 함수
   */
  const getMetadata = async () => {
    const updatedMetadataList = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const metadata = await exifr.parse(file);
      if (!metadata || !metadata.CreateDate || !metadata.latitude || !metadata.longitude) {
        updatedMetadataList.push({
          file,
          imgLocation: null,
          date: null,
          latitude: null,
          longitude: null,
          isThumbnail: thumbnailIdx === i,
        });
        setEmptyMetadataIdx((prevEmptyMetadataIdx) => prevEmptyMetadataIdx.concat(i));
      } else {
        updatedMetadataList.push({
          file,
          imgLocation: null,
          date: metadata.CreateDate,
          latitude: metadata.latitude,
          longitude: metadata.longitude,
          isThumbnail: thumbnailIdx === i,
        });
      }
    }

    setMetadataList(updatedMetadataList);
  };

  /**
   * TMAP POI 검색 api를 통해 POI 정보를 가져오는 함수
   */
  const getPoiData = async () => {
    const updatePoiList = [];
    for (let i = 0; i < metadataList.length; i++) {
      const item = metadataList[i];

      if (item.latitude && item.longitude) {
        const originalString = '식음료;놀거리';
        const encodedString = encodeURIComponent(originalString);

        const url = `https://apis.openapi.sk.com/tmap/pois/search/around?version=1&centerLon=${item.longitude}&centerLat=${item.latitude}&categories=${encodedString}&page=1&count=10&radius=1&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&multiPoint=N&sort=score`;
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', appKey: TMAP_APP_KEY },
        };

        try {
          const response = await fetch(url, options);
          if (response.status !== 200) {
            throw new Error(response.status);
          }
          const data = await response.json();
          updatePoiList.push(data);
        } catch (err) {
          updatePoiList.push(null);
          console.error('POI 검색 에러 발생', err);
        }
      } else {
        updatePoiList.push(null);
      }
    }

    setPoiList(updatePoiList);
  };

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

  const convertedSearchResult = (original) => ({
    title: original.name,
    address: `${original.upperAddrName} ${original.middleAddrName} ${original.lowerAddrName} ${original.firstNo}-${original.secondNo}`,
    mapx: parseFloat(original.noorLon) * 1e7,
    mapy: parseFloat(original.noorLat) * 1e7,
  });

  // 컴포넌트가 처음 렌더링될 때 메타데이터, 현재 위치를 가져옴
  useEffect(() => {
    getMetadata();
    getCurrentLocation();
  }, []);

  // 메타데이터가 가져와지면 POI 정보를 가져옴
  useEffect(() => {
    if (metadataList.length === 0 || poiList.length !== 0) {
      return;
    }
    getPoiData();
  }, [metadataList]);

  // 현재 위치 또는 사진의 메타데이터 위치로 지도 생성
  useEffect(() => {
    if (!currentLocation || searchResult.length !== 0 || metadataList.length === 0) {
      return;
    }

    let location;
    if (metadataList[idxBeingWritten].latitude && metadataList[idxBeingWritten].longitude) {
      location = new naver.maps.LatLng(metadataList[idxBeingWritten].latitude, metadataList[idxBeingWritten].longitude);
    } else {
      location = new naver.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
    }

    const mapOptions = {
      center: location,
      zoom: 15,
      zoomControl: false,
    };
    mapRef.current = new naver.maps.Map('map', mapOptions);

    if (!emptyMetadataIdx.includes(idxBeingWritten)) {
      setSelectedDate(metadataList[idxBeingWritten].date);
      if (!poiList[idxBeingWritten]) {
        return;
      }
      setSearchResult(poiList[idxBeingWritten].searchPoiInfo.pois.poi.map((original) => convertedSearchResult(original)));
    }
  }, [metadataList, currentLocation, poiList]);

  // 메타 데이터가 있는 사진의 경우 해당 위치로 지도 이동 및 POI 생성, 날짜 입력란을 해당 날짜로 설정
  useEffect(() => {
    if (!mapRef.current || metadataList.length === 0 || poiList.length === 0) {
      return;
    }

    setSearchInputValue('');
    setSearchResult([]);
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
    setSelectedMarker(null);

    if (!emptyMetadataIdx.includes(idxBeingWritten)) {
      setSelectedDate(metadataList[idxBeingWritten].date);
      if (!poiList[idxBeingWritten]) {
        return;
      }
      setSearchResult(poiList[idxBeingWritten].searchPoiInfo.pois.poi.map((original) => convertedSearchResult(original)));
      return;
    }

    setSelectedDate(new Date());
  }, [idxBeingWritten]);

  /**
   * 장소 검색 시 naver 장소 검색 api를 통해 관련 장소를 요청 및 응답을 searchResult에 저장하는 함수
   * @param {Event} e
   */
  const handleSearchPlace = (e) => {
    e.preventDefault();
    if (!mapRef.current || !searchInputValue) {
      return;
    }

    const url = `/api/search/v1/search/local.json?query=${searchInputValue}&display=5&start=1&sort=random`;

    const headers = {
      'X-Naver-Client-Id': NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
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
        setSearchResult(data.items);
      })
      .catch((err) => {
        console.error('주소 검색 fetch 에러 발생:', err);
      });
  };

  // 선택되지 않은 마커의 아이콘 설정
  const selectedIcon = (item) => ({
    content: `<div style="display: flex; gap: 4px; background-color: ${
      colors.mainColor
    }; border-radius: 40px; justify-content: center; align-items: center; padding: 4px 8px; border: 2px solid white; width: max-content;">
          <svg width="13" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.00004 0C3.58146 0 0 3.7189 0 8.30706C0 10.2856 0.669992 12.0997 1.78326 13.5258C2.14211 13.9847 2.74245 14.7074 3.05538 15.2015C4.85725 18.044 7.16889 22.1721 7.84255 25.5599C7.95813 26.1384 8.09744 26.1485 8.24742 25.5787C8.72791 23.752 9.97408 19.7607 12.5476 15.5844C12.8545 15.0863 13.4767 14.3893 13.8629 13.9553C14.4224 13.3262 14.888 12.6059 15.2418 11.8206C15.7242 10.7493 16 9.56339 16 8.30804C16 3.71935 12.4185 0 8.00004 0ZM8.00004 12.7953C5.53382 12.7953 3.53459 10.7194 3.53459 8.15851C3.53459 5.59808 5.53382 3.52222 8.00004 3.52222C10.4663 3.52222 12.4655 5.59817 12.4655 8.15851C12.4655 10.7195 10.4663 12.7953 8.00004 12.7953Z"
        fill="white"
      />
    </svg><div style="font-size: 14px; color: white">${item.title ? item.title : item.imgLocation}</div></div>`,
  });

  // 선택된 마커의 아이콘 설정
  const defaultIcon = (item) => ({
    content: `<div style="display: flex; gap: 4px; background-color: white; border-radius: 40px; justify-content: center; align-items: center; padding: 4px 8px; border: 2px solid black; width: max-content;">
          <svg width="13" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.00004 0C3.58146 0 0 3.7189 0 8.30706C0 10.2856 0.669992 12.0997 1.78326 13.5258C2.14211 13.9847 2.74245 14.7074 3.05538 15.2015C4.85725 18.044 7.16889 22.1721 7.84255 25.5599C7.95813 26.1384 8.09744 26.1485 8.24742 25.5787C8.72791 23.752 9.97408 19.7607 12.5476 15.5844C12.8545 15.0863 13.4767 14.3893 13.8629 13.9553C14.4224 13.3262 14.888 12.6059 15.2418 11.8206C15.7242 10.7493 16 9.56339 16 8.30804C16 3.71935 12.4185 0 8.00004 0ZM8.00004 12.7953C5.53382 12.7953 3.53459 10.7194 3.53459 8.15851C3.53459 5.59808 5.53382 3.52222 8.00004 3.52222C10.4663 3.52222 12.4655 5.59817 12.4655 8.15851C12.4655 10.7195 10.4663 12.7953 8.00004 12.7953Z"
        fill=${colors.mainColor}
      />
    </svg><div style="font-size: 14px">${item.title ? item.title : item.imgLocation}</div></div>`,
  });

  // 장소 검색 시 마커 생성
  useEffect(() => {
    if (searchResult.length === 0 || !mapRef.current) {
      return;
    }

    // 이전 검색으로 생성된 마커 제거
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
    setSelectedMarker(null);

    // 검색된 장소에 마커 생성
    const newMarker = [];
    searchResult.forEach((item) => {
      const latLng = new naver.maps.LatLng(item.mapy / 1e7, item.mapx / 1e7);
      const marker = new naver.maps.Marker({
        position: latLng,
        map: mapRef.current,
        icon: defaultIcon(item),
      });
      naver.maps.Event.addListener(marker, 'click', () => {
        setSelectedMarker((prevState) => {
          // 이전에 선택된 마커가 존재할 경우 선택 해제
          if (prevState) {
            prevState.marker.setIcon(defaultIcon(prevState.item));
          }
          // 새로 클릭된 마커 선택
          marker.setIcon(selectedIcon(item));
          mapRef.current.morph(marker.getPosition(), 20, {
            duration: 2000,
            easing: 'easeOutCubic',
          });
          return { marker, item };
        });
      });
      newMarker.push(marker);
    });
    setMarkers(newMarker);
  }, [poiList, searchResult]);

  /**
   * 검색된 결과 클릭 시 해당 마커를 선택하는 함수
   * @param {*} item
   */
  const handleSearchResultClick = (item) => {
    // 이전에 선택된 마커가 있을 경우 선택 해제
    if (selectedMarker) {
      selectedMarker.marker.setIcon(defaultIcon(selectedMarker.item));
    }

    markers.forEach((marker) => {
      if (marker.getPosition().equals(new naver.maps.LatLng(item.mapy / 1e7, item.mapx / 1e7))) {
        // 클릭된 SearchResult에 해당하는 마커를 찾았을 때
        marker.setIcon(selectedIcon(item));
        setSelectedMarker({ marker, item });
        mapRef.current.morph(marker.getPosition(), 20, {
          duration: 2000,
          easing: 'easeOutCubic',
        });
      }
    });
  };

  // 마커 생성 시 해당 위치로 지도 이동
  useEffect(() => {
    if (!mapRef.current || markers.length === 0) {
      return;
    }

    if (markers.length === 1) {
      mapRef.current.morph(markers[0].getPosition(), 20, {
        duration: 2000,
        easing: 'easeOutCubic',
      });
      return;
    }

    const bounds = new naver.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }
    mapRef.current.fitBounds(bounds);

    markers.forEach((marker) => {
      marker.setAnimation(naver.maps.Animation.DROP);
    });
  }, [markers]);

  /**
   * 정보 저장하기 버튼을 누를 시 실행되는 함수
   */
  const handleSaveInfo = () => {
    setMetadataList((prevMetadataList) => {
      const updatedMetadataList = prevMetadataList.map((item, index) => {
        if (index === idxBeingWritten) {
          return {
            ...item,
            imgLocation: selectedMarker.item.title,
            date: selectedDate,
            latitude: selectedMarker.item.mapy / 1e7,
            longitude: selectedMarker.item.mapx / 1e7,
          };
        }
        return item;
      });
      return updatedMetadataList;
    });
  };

  /**
   * 지도 만들기 버튼을 누를 시 실행되는 함수
   */
  const handleCreateMap = () => {
    setIsClickedCreateMap(true);

    const multipartFileList = metadataList.map((metadata) => metadata.file);

    const objectList = metadataList.map((metadata) => {
      const { file, ...otherProperties } = metadata;
      return otherProperties;
    });

    const sortedMetadataList = [...metadataList];
    sortedMetadataList.sort((a, b) => new Date(a.date) - new Date(b.date));

    const updatedTourRequestDTO = {
      ...tourRequestDTO,
      size: metadataList.length,
      startDay: sortedMetadataList[0].date,
      endDay: sortedMetadataList[metadataList.length - 1].date,
      imageMetadataDTOList: objectList,
    };

    const formData = new FormData();
    const json = JSON.stringify(updatedTourRequestDTO);
    formData.append('tourRequestDTO', new Blob([json], { type: 'application/json' }));
    multipartFileList.forEach((file) => {
      formData.append('multipartFileList', file);
    });

    fetch(`${BASE_URL}/tours`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwODE2NDY5MiwiZXhwIjoxNzExNzY0NjkyfQ.dmedwBzZZdtOLDJqSMScpDrBhkx44h5qV2RVyrwpF-I',
      },
    }).catch((error) => {
      console.log(error);
    });
  };

  // 지도 저장하기 버튼이 눌리면 지도 생성 및 장소를 이을 경로를 받아옴
  useEffect(() => {
    if (!isClickedCreateMap) {
      return;
    }

    const mapOptions = {
      zoom: 15,
      zoomControl: false,
    };
    routeMapRef.current = new naver.maps.Map('routeMap', mapOptions);

    const bounds = new naver.maps.LatLngBounds();

    // 날짜 오름차순(과거 -> 현재)으로 정렬
    const sortedMetadataList = [...metadataList];
    sortedMetadataList.sort((a, b) => new Date(a.date) - new Date(b.date));

    // 마커 생성
    for (let i = 0; i < sortedMetadataList.length; i++) {
      const latLng = new naver.maps.LatLng(sortedMetadataList[i].latitude, sortedMetadataList[i].longitude);
      bounds.extend(latLng);

      new naver.maps.Marker({
        position: latLng,
        map: routeMapRef.current,
        icon: defaultIcon(sortedMetadataList[i]),
        animation: naver.maps.Animation.DROP,
      });
    }

    routeMapRef.current.fitBounds(bounds);

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
  }, [isClickedCreateMap]);

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
  }, [routeLatLng]);

  return !isClickedCreateMap ? (
    <EnterMetadataContainer>
      <UploadedImgContainer>
        <ImgContainer>
          {fileImgSrcList.map((url, i) => (
            <div key={i + 1} style={{ position: 'relative' }}>
              <UploadedImg key={i + 1} src={url} alt="업로드한 사진" />
              {idxBeingWritten === i && <Overlay />}
              {(metadataList.length === 0 ? false : Object.values(metadataList[i]).every((value) => value !== null)) && (
                <IsSaveInfo>
                  <Check stroke={colors.mainColor} />
                  저장됨
                </IsSaveInfo>
              )}
            </div>
          ))}
        </ImgContainer>
      </UploadedImgContainer>
      <EnterInputContainer>
        <SearchAddressForm onSubmit={handleSearchPlace}>
          <SearchAddressInputContainer>
            <SearchAddressInput
              type="text"
              placeholder="장소를 검색해주세요."
              value={searchInputValue}
              onChange={(e) => {
                setSearchInputValue(e.target.value);
              }}
            />
          </SearchAddressInputContainer>
          <SearchAddressResult>
            {searchResult.map((item, i) => (
              <SearchResult
                key={i + 1}
                onClick={() => {
                  handleSearchResultClick(item);
                }}
                selected={selectedMarker ? item.address === selectedMarker.item.address && item.title === selectedMarker.item.title : false}
              >
                <SearchResultName>장소명: {item.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}</SearchResultName>
                <SearchResultAddress>주소: {item.address.replace(/<b>/g, '').replace(/<\/b>/g, '')}</SearchResultAddress>
              </SearchResult>
            ))}
          </SearchAddressResult>
        </SearchAddressForm>
        <EnterInput>
          <div id="map" style={{ width: '417px', aspectRatio: 1 }} />
          <EnterDateContainer>
            <EnterDate>날짜입력란</EnterDate>
            <StyledDatePicker>
              <DatePicker
                showPopperArrow={false}
                fixedHeight
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                maxDate={new Date()}
                showIcon
                toggleCalendarOnIconClick
                showTimeSelect
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
              />
            </StyledDatePicker>
          </EnterDateContainer>
          <BtnContainer>
            <SelectAnotherBtn
              type="button"
              onClick={() => {
                setSelectedDate(new Date());
                setIdxBeingWritten((prevIdxBeingWritten) => {
                  if (prevIdxBeingWritten === 0) {
                    return fileImgSrcList.length - 1;
                  }
                  return prevIdxBeingWritten - 1;
                });
              }}
              disabled={!currentLocation || poiList.length === 0}
            >
              이전
            </SelectAnotherBtn>
            <SelectAnotherBtn
              type="button"
              onClick={() => {
                setSelectedDate(new Date());
                setIdxBeingWritten((prevIdxBeingWritten) => {
                  if (prevIdxBeingWritten === fileImgSrcList.length - 1) {
                    return 0;
                  }
                  return prevIdxBeingWritten + 1;
                });
              }}
              disabled={!currentLocation || poiList.length === 0}
            >
              다음
            </SelectAnotherBtn>
            <SaveInfoBtn onClick={handleSaveInfo} disabled={!selectedMarker || !selectedDate}>
              정보 저장하기
            </SaveInfoBtn>
            <CreateMapBtn
              disabled={metadataList.length === 0 ? true : !metadataList.every((item) => Object.values(item).every((value) => value !== null))}
              onClick={handleCreateMap}
            >
              지도 만들기
            </CreateMapBtn>
          </BtnContainer>
        </EnterInput>
      </EnterInputContainer>
    </EnterMetadataContainer>
  ) : (
    <div id="routeMap" style={{ width: '777px', height: '500px' }} />
  );
}

const EnterMetadataContainer = styled.div`
  display: flex;
  width: 777px;
  justify-content: space-between;
  gap: 40px;
`;
const UploadedImgContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImgContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 8px;
  width: 320px;
  aspect-ratio: 3/4;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 20px;
  border: 2px dashed ${colors.darkGray};
  background: ${colors.lightGray};
`;

const UploadedImg = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 10px;
`;

const IsSaveInfo = styled.div`
  position: absolute;
  top: 0;
  background-color: white;
  color: ${colors.mainColor};
  font-size: 12px;
  padding: 0px 3px;
  display: flex;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  background-color: ${colors.mainColor};
  opacity: 0.5;
  top: 0;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 10px;
`;

const EnterInputContainer = styled.div`
  display: flex;
`;

const EnterInput = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const SearchAddressForm = styled.form`
  z-index: 1;
  width: 180px;
  height: 463px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.lightGray};
  box-sizing: border-box;
`;

const SearchAddressInputContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.mainColor};
`;

const SearchAddressInput = styled.input`
  border-radius: 15px;
  opacity: 0.8;
  background-color: white;
  border: none;
  padding: 5px 15px;
  width: 110px;
  font-family: 'KNU20TRUTH-Regular';
  cursor: pointer;
`;

const SearchAddressResult = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  background-color: white;
  overflow-y: auto;
`;

const SearchResult = styled.div`
  background-color: ${(props) => (props.selected ? colors.lightBlue : 'white')};
  border-bottom: 1px solid ${(props) => (props.selected ? colors.lightBlue : colors.lightGray)};
  padding: 8px;
  cursor: pointer;
`;
const SearchResultName = styled.div`
  font-size: 14px;
  line-height: 140%;
  color: black;
`;

const SearchResultAddress = styled.div`
  font-size: 10px;
  line-height: 140%;
  color: ${colors.darkGray};
`;

const EnterDateContainer = styled.div`
  border: 1px solid ${colors.lightGray};
  width: 100%;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
`;

const EnterDate = styled.div`
  border-radius: 10px 0px 0px 10px;
  background-color: ${colors.mainColor};
  display: inline-flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  color: white;
`;

const StyledDatePicker = styled.div`
  width: 100%;
  cursor: pointer;
  .react-datepicker {
    border: none;
    box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.1);
  }
  .react-datepicker-wrapper input {
    font-family: 'KNU20TRUTH-Regular';
    width: 100%;
    border: none;
    padding: 0.5rem 0px 0.5rem 30px;
    font-size: 15px;
  }
  .react-datepicker-popper {
    transform: translate(776px, 158.5px) !important;
  }
  .react-datepicker__header {
    background-color: white;
    border-bottom: 1px solid ${colors.lightGray};
  }
  .react-datepicker__current-month {
    display: flex;
    padding-left: 10px;
    font-family: 'KNU20TRUTH-Regular';
  }
  .react-datepicker__day-names {
    font-family: 'KNU20TRUTH-Regular';
  }
  .react-datepicker__navigation--previous {
    left: 180px;
  }
  .react-datepicker__day {
    font-family: 'KNU20TRUTH-Regular';
  }
  .react-datepicker__day--outside-month {
    cursor: default;
    color: ${colors.lightGray};
  }
  .react-datepicker__day--keyboard-selected {
    background-color: white;
  }
  .react-datepicker__day--disabled {
    color: ${colors.lightGray};
  }
  .react-datepicker__day--selected {
    background-color: ${colors.mainColor};
    border-radius: 100%;
  }
  .react-datepicker__time-container {
    border-left: 1px solid ${colors.lightGray};
  }
  .react-datepicker__time-list-item {
    display: flex;
    align-items: center;
    font-family: 'KNU20TRUTH-Regular';
  }
  .react-datepicker__time-list-item--selected {
    background-color: ${colors.mainColor} !important;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const SelectAnotherBtn = styled.button`
  font-family: KNU20TRUTH-Regular;
  display: inline-flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 122%;
  border-radius: 10px;
  border: none;
  background-color: ${colors.mainColor};
  color: white;
  margin-top: 20px;
  height: fit-content;
  width: fit-content;
  cursor: pointer;
`;

const SaveInfoBtn = styled.button`
  font-family: KNU20TRUTH-Regular;
  display: inline-flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 122%;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.disabled ? colors.lightGray : colors.mainColor)};
  color: ${(props) => (props.disabled ? 'black' : 'white')};
  margin-top: 20px;
  height: fit-content;
  width: fit-content;
  cursor: pointer;
`;

const CreateMapBtn = styled.button`
  font-family: KNU20TRUTH-Regular;
  display: inline-flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 122%;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.disabled ? colors.lightGray : colors.mainColor)};
  color: ${(props) => (props.disabled ? 'black' : 'white')};
  margin-top: 20px;
  height: fit-content;
  width: fit-content;
  cursor: pointer;
`;

export default EnterMetadata;
