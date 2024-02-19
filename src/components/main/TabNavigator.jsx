import { useState } from 'react';
import styled from 'styled-components';
import Gallery from './Gallery';
import Location from '../../assets/icon/Location';
import Record from '../../assets/icon/Record';
import Calendar from '../../assets/icon/Calendar';
import colors from '../../styles/colors';

function TabNavigator() {
  const [tabType, setTabType] = useState('조회순');

  return (
    <TabNavigatorContainer>
      <TabContainer>
        <Region $tabType={tabType} onClick={() => setTabType('조회순')}>
          <Location stroke={tabType === '조회순' ? 'white' : colors.mainColor} />
          <TabName>조회순</TabName>
        </Region>
        <Recent $tabType={tabType} onClick={() => setTabType('최신순')}>
          <Record fill={tabType === '최신순' ? 'white' : colors.mainColor} />
          <TabName>최신순</TabName>
        </Recent>
        <Weather $tabType={tabType} onClick={() => setTabType('날짜별')}>
          <Calendar fill={tabType === '날짜별' ? 'white' : colors.mainColor} />
          <TabName>날짜별</TabName>
        </Weather>
      </TabContainer>
      <Gallery sortedBy={tabType === '조회순' ? 'views' : 'date'} />
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
  border: 3px solid ${(props) => (props.$tabType === '조회순' ? 'white' : colors.mainColor)};
  background-color: ${(props) => (props.$tabType === '조회순' ? colors.mainDarkColor : 'white')};
  color: ${(props) => (props.$tabType === '조회순' ? 'white' : colors.mainColor)};
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
  border: 3px solid ${(props) => (props.$tabType === '최신순' ? 'white' : colors.mainColor)};
  background-color: ${(props) => (props.$tabType === '최신순' ? colors.mainDarkColor : 'white')};
  color: ${(props) => (props.$tabType === '최신순' ? 'white' : colors.mainColor)};
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
  border: 3px solid ${(props) => (props.$tabType === '날짜별' ? 'white' : colors.mainColor)};
  background-color: ${(props) => (props.$tabType === '날짜별' ? colors.mainDarkColor : 'white')};
  color: ${(props) => (props.$tabType === '날짜별' ? 'white' : colors.mainColor)};
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
`;

const TabName = styled.div`
  margin-left: 10px;
`;

export default TabNavigator;
