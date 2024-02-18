import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsSidebar from '../SettingsSidebar';
import RecordListItem from './RecordListItem';
import dummy1 from '../../../assets/dummy/dummy1.jpg';

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
          <ListText1>기록물</ListText1>
          <ListText2>공개상태</ListText2>
          <ListText3>조회수</ListText3>
          <ListText4>좋아요</ListText4>
          <ListText5>댓글</ListText5>
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
  min-height: 100vh;
  font-family: 'KNU20TRUTH-Regular';
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  min-width: 600px;
  margin: 0 auto;
  padding-left: 0;
  margin-bottom: 20px;
  justify-content: center;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  margin-top: 60px;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 30px;
`;
const Content = styled.div`
  margin-top: 8px;
  margin-left: 1px;
  padding-bottom: 38px;
  font-size: 15px;
  color: #a4a4a4;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 2px solid #646464;
  margin-right: 10px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 15px;
`;

const ListText1 = styled.div`
  margin-left: 5px;
  margin-right: 341px;
`;

const ListText2 = styled.div`
  margin-right: 150px;
`;

const ListText3 = styled.div`
  margin-right: 48px;
`;

const ListText4 = styled.div`
  margin-right: 48px;
`;

const ListText5 = styled.div`
  margin-right: 5px;
`;

const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  color: #505050;
`;

export default RecordPage;