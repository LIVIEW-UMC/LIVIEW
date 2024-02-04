import styled from 'styled-components';
import colors from '../../styles/colors';
import Check from '../../assets/icon/Check';

function MapListItem({ item, setMapItems }) {
  return (
    <MapListItemContainer $isChecked={item.isChecked}>
      <CheckBox
        onClick={() => {
          setMapItems((prevItems) =>
            prevItems.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, isChecked: !prevItem.isChecked } : prevItem)),
          );
        }}
        $isChecked={item.isChecked}
      >
        {item.isChecked && <Check stroke={'white'} />}
      </CheckBox>
      <Img src={item.imgSrc} alt="지도 초안 대표이미지" />
      <Explain>
        <MapName>{item.name}</MapName>
        <ExpirationPeriod>만료되기까지 {item.expirationPeriod}일 남음</ExpirationPeriod>
      </Explain>
    </MapListItemContainer>
  );
}

const MapListItemContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 218px;
  height: 80px;
  padding: 5px;
  align-items: center;
  gap: 6px;
  background-color: ${(props) => (props.$isChecked ? colors.ivoryGray : 'white')};
  border-radius: 10px;
`;

const CheckBox = styled.div`
  width: 14px;
  height: 14px;
  border: 1.5px solid ${(props) => (props.$isChecked ? colors.mainColor : colors.darkGray)};
  border-radius: 4px;
  background-color: ${(props) => (props.$isChecked ? colors.mainColor : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 17px;
`;

const Explain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MapName = styled.div`
  font-size: 14px;
  line-height: 122%;
`;

const ExpirationPeriod = styled.div`
  font-size: 12px;
  line-height: 122%;
  color: ${colors.darkGray};
`;

export default MapListItem;
