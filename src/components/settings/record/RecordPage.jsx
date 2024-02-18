import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsSidebar from '../SettingsSidebar';
import RecordListItem from './RecordListItem';
import dummy1 from '../../../assets/dummy/dummy1.jpg';
import colors from '../../../styles/colors';

function RecordPage() {
  const [recordItems, setRecordItems] = useState([
    {
      id: 1,
      imgSrc: dummy1,
      name: '부산맛집사진 동선',
      date: '2024년 01월 08일 ~ 2024년 01월 12일',
      hits: '128회',
      good: '31회',
      comment: '100개',
      isChecked: false,
    },
    {
      id: 2,
      imgSrc: dummy1,
      name: '서울 1박 2일 여행 코스',
      date: '2024년 01월 08일 ~ 2024년 01월 12일',
      hits: '128회',
      good: '31회',
      comment: '7개',
      isChecked: false,
    },
    {
      id: 3,
      imgSrc: dummy1,
      name: '사케 탐방 동선',
      date: '2024년 01월 08일 ~ 2024년 01월 12일',
      hits: '128회',
      good: '31회',
      comment: '7개',
      isChecked: false,
    },
    {
      id: 4,
      imgSrc: dummy1,
      name: '일본여행 코스',
      date: '2024년 01월 08일 ~ 2024년 01월 12일',
      hits: '128회',
      good: '31회',
      comment: '7개',
      isChecked: false,
    },
    {
      id: 5,
      imgSrc: dummy1,
      name: '빌딩내 미끄럼틀',
      date: '2024년 01월 08일 ~ 2024년 01월 12일',
      hits: '128회',
      good: '31회',
      comment: '7개',
      isChecked: false,
    },
    {
      id: 6,
      imgSrc: dummy1,
      name: '부산맛집사진 동선',
      date: '2024년 01월 08일 ~ 2024년 01월 12일',
      hits: '128회',
      good: '31회',
      comment: '7개',
      isChecked: false,
    },
  ]);

  return (
    <All>
      <SettingsSidebar />
      <Container>
        <TitleContainer>
          <Title>기록 공개여부</Title>
          <Content>본인의 기록을 비공개로 설정하면 다른 사람들이 본인의 게시물을 볼 수 없어요!!</Content>
        </TitleContainer>
        <Divider />
        <ListContainer>
          <ListItem>기록물</ListItem>
          <ListItem>공개상태</ListItem>
          <ListItem>조회수</ListItem>
          <ListItem>좋아요</ListItem>
          <ListItem>댓글</ListItem>
        </ListContainer>
        <Divider />
        <RecordList>
          {recordItems.map((item) => (
            <RecordListItem key={item.id} item={item} setRecordItems={setRecordItems} />
          ))}
        </RecordList>
      </Container>
    </All>
  );
}

const All = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  min-height: calc(100vh - 62px);
  font-family: 'KNU20TRUTH-Regular';
`;

const Container = styled.div`
  width: 777px;
  display: flex;
  flex-direction: column;
  padding: 5vh 0px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 30px;
`;
const Content = styled.div`
  margin-top: 8px;
  font-size: 15px;
  color: #a4a4a4;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${colors.darkGray};
  margin: 7px 0px;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1.5fr 1fr 1fr 1fr;
  font-size: 15px;
`;

const ListItem = styled.div``;

const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  color: #505050;
  gap: 10px;
`;

export default RecordPage;
