import React from 'react';
import styled from 'styled-components';

const RecordListItem = ({ item, updateRecordItem }) => {
  const toggleVisibility = () => {
    updateRecordItem((prevItems) =>
      prevItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, isChecked: !prevItem.isChecked } : prevItem)),
    );
  };

  return (
    <RecordListItemContainer $isChecked={item.isChecked}>
      <RecordList>
        <Img src={item.imgSrc} alt="기록 대표이미지" />
        <Explain>
          <RecordName>{item.name}</RecordName>
          <DateRange>{item.date}</DateRange>
        </Explain>
      </RecordList>
      <PublicContainer>
        <Desc>{item.isChecked ? ' 공개 ' : '비공개'}</Desc>
        <ToggleContainer onClick={toggleVisibility}>
          <div className={`toggle-container ${item.isChecked ? 'toggle--checked' : ''}`} />
          <div className={`toggle-circle ${item.isChecked ? 'toggle--checked' : ''}`} />
        </ToggleContainer>
      </PublicContainer>
      <Item>{item.hits}</Item>
      <Item>{item.good}</Item>
      <Item>{item.comment}</Item>
    </RecordListItemContainer>
  );
};

const RecordListItemContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1.5fr 1fr 1fr 1fr;
`;

const RecordList = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 134px;
  height: 105px;
  object-fit: cover;
`;

const Explain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 14px;
  justify-content: space-between;
`;

const RecordName = styled.div`
  font-size: 14px;
  line-height: 122%;
`;

const DateRange = styled.div`
  font-size: 10px;
  line-height: 122%;
  color: #505050;
`;

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  align-items: center;
  height: 30px;

  > .toggle-container {
    width: 51px;
    height: 24px;
    border-radius: 30px;
    background-color: #c8c8c8;
    border: 3px solid #8b8b8b;

    &.toggle--checked {
      background-color: #b2c3ff;
      border: 3px solid #4e75ff;
    }
    transition: background-color 0.5s ease-in-out;
  }

  > .toggle-circle {
    position: absolute;
    top: 50%;
    left: 3px;
    transform: translate(0%, -50%);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #ffffff;

    &.toggle--checked {
      left: 31px;
    }
    transition: left 0.5s ease-in-out;
  }
`;

const PublicContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Desc = styled.div`
  font-size: 15px;
  width: 50%;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

export default RecordListItem;
