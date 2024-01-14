import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SortButton from '../../assets/icon/SortButton';
import SortModal from './SortModal';
import PhotoPost from './PhotoPost';
import photo from '../../assets/dummy/dummy1.jpg';

function Tapbar() {
  const [areaClicked, setAreaClicked] = useState(false);

  useEffect(() => {
    function handleClick(event) {
      const targetElement = event.target;

      if (!targetElement.closest('.exclude-div')) {
        setAreaClicked(false);
      }
    }
    if (areaClicked) {
      document.addEventListener('click', handleClick);
    } else {
      document.removeEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [areaClicked]);

  return (
    <TapContainer>
      <TapItem
        Width="26px"
        onClick={(event) => {
          event.stopPropagation();
          setAreaClicked((prevState) => !prevState);
        }}
        style={{ cursor: 'pointer' }}
      >
        <SortButton />
      </TapItem>
      {areaClicked ? (
        <TapItem className="exclude-div">
          <SortModal />
        </TapItem>
      ) : null}
      <TapGap flex={309} />
      <TapItem Width="139px">새로운 지도 기록 만들기</TapItem>
      <TapGap flex={86} />
      <TapItem
        Width="39px"
        style={{
          boxSizing: 'border-box',
          borderBottom: '2.5px solid',
          height: '23px',
        }}
      >
        저장됨
      </TapItem>
      <TapGap flex={537} />
      <TapItem
        Width="81px"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '21px',
        }}
      >
        작성중인 파일
        <PhotoPost photosrc={photo} alt="소세지" />
      </TapItem>
    </TapContainer>
  );
}

const TapContainer = styled.div`
  width: 100%;
  height: 26px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 82px 0px 38px 0px;
  padding: 0px 143px 0px 40px;
`;

const TapItem = styled.div`
  min-width: ${({ Width }) => Width};
  max-width: ${({ Width }) => Width};
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 18.3px;
  letter-spacing: 0;
  text-align: left;
`;

const TapGap = styled.div`
  flex-grow: ${({ flex }) => flex};
  background-color: transparent;
`;

export default Tapbar;
