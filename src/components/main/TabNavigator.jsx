import { useState } from 'react';
import styled from 'styled-components';
import Gallery from './Gallery';
import Location from '../../assets/icon/Location';
import Record from '../../assets/icon/Record';
import Calendar from '../../assets/icon/Calendar';
import colors from '../../styles/colors';

const imageContextRegion = require.context('../../assets/region', false, /\.(png)$/);
const imageContextWeather = require.context('../../assets/weather', false, /\.(png)$/);
const imageContextRecent = require.context('../../assets/dummy/recent', false, /\.(png)$/);

function TabNavigator() {
  const [tabType, setTabType] = useState('region');

  const imagesRegion = imageContextRegion.keys().map(imageContextRegion);
  const nameRegion = ['서울', '강원도', '울산', '경상남도', '경상북도', '경기도', '충청북도'];

  const imagesWeather = imageContextWeather.keys().map(imageContextWeather);
  const nameWeather = ['봄', '여름', '가을', '겨울'];

  const imagesRecent = imageContextRecent.keys().map(imageContextRecent);
  const nameRecent = ['유니버셜', '유니버셜..', '도톤보리...', '등산..', '롯데타위..', '수중정원...', '오사카성..'];

  return (
    <TabNavigatorContainer>
      <TabContainer>
        <Region $tabType={tabType} onClick={() => setTabType('region')}>
          <Location stroke={tabType === 'region' ? 'white' : colors.mainColor} />
          <TabName>지역별</TabName>
        </Region>
        <Recent $tabType={tabType} onClick={() => setTabType('recent')}>
          <Record fill={tabType === 'recent' ? 'white' : colors.mainColor} />
          <TabName>최신순</TabName>
        </Recent>
        <Weather $tabType={tabType} onClick={() => setTabType('weather')}>
          <Calendar fill={tabType === 'weather' ? 'white' : colors.mainColor} />
          <TabName>날짜별</TabName>
        </Weather>
      </TabContainer>
      <SubTabContainer>
        {tabType === 'region' &&
          imagesRegion.map((image, index) => (
            <SubTabItem key={index + 1}>
              <SubTabImage src={image} alt={`img-${index}`} />
              <SubTabName>{nameRegion[index]}</SubTabName>
            </SubTabItem>
          ))}
        {tabType === 'recent' &&
          imagesRecent.map((image, index) => (
            <SubTabItem>
              <SubTabImage src={image} alt={`img-${index}`} />
              <SubTabName>{nameRecent[index]}</SubTabName>
            </SubTabItem>
          ))}
        {tabType === 'weather' &&
          imagesWeather.map((image, index) => (
            <SubTabItem>
              <SubTabImage src={image} alt={`img-${index}`} />
              <SubTabName>{nameWeather[index]}</SubTabName>
            </SubTabItem>
          ))}
      </SubTabContainer>
      <Gallery />
    </TabNavigatorContainer>
  );
}

const TabNavigatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabContainer = styled.div`
  font-family: KNU20TRUTH-Regular;
  width: 354px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 33px;
`;

const Region = styled.div`
  width: 113px;
  height: 34px;
  padding: 5px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${(props) => (props.$tabType === 'region' ? 'white' : colors.mainColor)};
  background-color: ${(props) => (props.$tabType === 'region' ? colors.mainDarkColor : 'white')};
  color: ${(props) => (props.$tabType === 'region' ? 'white' : colors.mainColor)};
  border-radius: 10px 0px 0px 10px;
  cursor: pointer;
`;

const Recent = styled.div`
  width: 113px;
  height: 34px;
  padding: 5px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${(props) => (props.$tabType === 'recent' ? 'white' : colors.mainColor)};
  background-color: ${(props) => (props.$tabType === 'recent' ? colors.mainDarkColor : 'white')};
  color: ${(props) => (props.$tabType === 'recent' ? 'white' : colors.mainColor)};
  cursor: pointer;
`;

const Weather = styled.div`
  width: 113px;
  height: 34px;
  padding: 5px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${(props) => (props.$tabType === 'weather' ? 'white' : colors.mainColor)};
  background-color: ${(props) => (props.$tabType === 'weather' ? colors.mainDarkColor : 'white')};
  color: ${(props) => (props.$tabType === 'weather' ? 'white' : colors.mainColor)};
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
`;

const TabName = styled.div`
  margin-left: 10px;
`;

const SubTabContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const SubTabItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTabImage = styled.img`
  width: 70px;
  height: 70px;
  margin: 0px 25px 8px 25px;
`;

const SubTabName = styled.div`
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
`;

export default TabNavigator;
