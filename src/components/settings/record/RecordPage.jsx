import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SettingsSidebar from '../SettingsSidebar';
import RecordListItem from './RecordListItem';
// import dummy1 from '../../../assets/dummy/dummy1.jpg';
import colors from '../../../styles/colors';

function RecordPage() {
  const [recordItems, setRecordItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jin-myserver.shop/community/mypost', {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE3MDgyODY5MDYsImV4cCI6MTcwODI4NzUwNn0.a6BqvGvGjf8vvYhU4cPmxJGQLK1xM66cmEMyMK_GkzU',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('서버 응답 실패');
      }

      const data = await response.json();
      setRecordItems(data);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleVisibility = async (postId, visibility) => {
    try {
      await fetch(`https://jin-myserver.shop/community/post/${postId}`, {
        method: 'PATCH',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE3MDgyODY5MDYsImV4cCI6MTcwODI4NzUwNn0.a6BqvGvGjf8vvYhU4cPmxJGQLK1xM66cmEMyMK_GkzU',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visibility }),
      });
      setRecordItems((prevState) => prevState.map((item) => (item.id === postId ? { ...item, visibility } : item)));
    } catch (error) {
      console.error('공개/비공개 처리 중 오류 발생:', error);
    }
  };

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
            <RecordListItem key={item.tourId} item={item} toggleVisibility={toggleVisibility} />
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
