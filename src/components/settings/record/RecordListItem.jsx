import React from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';

const RecordListItem = ({ item, setRecordItems }) => {
  const handleToggle = () => {
    if (setRecordItems) {
      setRecordItems((prevItems) =>
        prevItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, isChecked: !prevItem.isChecked } : prevItem)),
      );
    }
  };

  return (
    <RecordListItemContainer $isChecked={item.isChecked}>
      <Img src={item.imgSrc} alt="기록 대표이미지" />
      <Explain>
        <RecordName>{item.name}</RecordName>
        <br />
        <br />
        <br />
        <DateRange>{item.date}</DateRange>
      </Explain>
      <Desc>{item.isChecked ? ' 공개' : '비공개'}</Desc>
      <ToggleContainer onClick={handleToggle}>
        <div className={`toggle-container ${item.isChecked ? 'toggle--checked' : ''}`} />
        <div className={`toggle-circle ${item.isChecked ? 'toggle--checked' : ''}`} />
      </ToggleContainer>
      <FunctionContainer>
        <NumberViews>{item.hits}</NumberViews>
        <GoodButton>{item.good}</GoodButton>
        <NumberComments>{item.comment}</NumberComments>
      </FunctionContainer>
    </RecordListItemContainer>
  );
};

const RecordListItemContainer = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
`;

const Img = styled.img`
  width: 134px;
  height: 105px;
  object-fit: cover;
  padding-left: 0;
  margin-bottom: 15px;
`;

const Explain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const RecordName = styled.div`
  font-size: 14px;
  line-height: 122%;
`;

const DateRange = styled.div`
  font-size: 12px;
  line-height: 122%;
  color: ${colors.darkGray};
`;

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  align-items: center;

  > .toggle-container {
    width: 50px;
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
    left: 1px;
    transform: translate(0%, -50%);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #ffffff;

    &.toggle--checked {
      left: 27px;
    }
    transition: left 0.5s ease-in-out;
  }
`;

const Desc = styled.div`
  text-align: center;
  font-size: 15px;
  margin-top: 15px;
  margin-left: 20px;
`;

const FunctionContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  gap: 6px;
  margin-left: 110px;
`;

const NumberViews = styled.div``;

const GoodButton = styled.div`
  margin-left: 30px;
`;

const NumberComments = styled.div`
  margin-left: 30px;
`;

export default RecordListItem;
