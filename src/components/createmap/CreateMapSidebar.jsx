import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MapListItem from './MapListItem';
import colors from '../../styles/colors';
import LeftArrow from '../../assets/icon/LeftArrow';
import Check from '../../assets/icon/Check';
import Trash from '../../assets/icon/Trash';
import BASE_URL from '../../config/baseUrl';

function CreateMapSidebar({ mapItems, setMapItems }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const [checkedItemCount, setCheckedItemCount] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const [writingDraftId, setWritingDraftId] = useState(null);

  const allCheckBoxClicked = () => {
    setMapItems((prevItems) =>
      prevItems.map((prevItem) => ({
        ...prevItem,
        isChecked: checkedItemCount !== 0 ? false : writingDraftId !== prevItem.id,
      })),
    );
  };

  const deleteBtnClicked = () => {
    mapItems
      .filter((item) => item.isChecked)
      .forEach((item) => {
        fetch(`${BASE_URL}/tours/${item.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    setMapItems((prevItems) => prevItems.filter((item) => item.isChecked === false));
  };

  useEffect(() => {
    fetch(`${BASE_URL}/tours/incompleted/simple`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMapItems(data.map((item) => ({ id: item.tourId, imgSrc: item.imageURL, name: item.title, expirationPeriod: 30, isChecked: false })));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const count = mapItems.filter((item) => item.isChecked).length;
    setCheckedItemCount(count);
    if (count === mapItems.length && count !== 0) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [mapItems]);

  return (
    <SidebarContainer $showSidebar={showSidebar}>
      {showSidebar && (
        <ShowSidebar>
          <div>
            <MapDraftCount>지도초안({mapItems.length})</MapDraftCount>
            <MapList>
              {mapItems.map((item) => (
                <MapListItem
                  key={item.id}
                  item={item}
                  setMapItems={setMapItems}
                  writingDraftId={writingDraftId}
                  setWritingDraftId={setWritingDraftId}
                />
              ))}
            </MapList>
          </div>
          <div>
            <Hr />
            <DeleteMap>
              <DeleteMapCount>
                <CheckBox onClick={allCheckBoxClicked} $isAllChecked={isAllChecked}>
                  {isAllChecked && <Check stroke={'white'} />}
                </CheckBox>
                <div>
                  {checkedItemCount}/{mapItems.length}
                </div>
              </DeleteMapCount>
              <DeleteBtn onClick={deleteBtnClicked}>
                <Trash />
              </DeleteBtn>
            </DeleteMap>
          </div>
        </ShowSidebar>
      )}
      <ShowSidebarIcon onClick={() => setShowSidebar((prev) => !prev)} $showSidebar={showSidebar}>
        <LeftArrow />
      </ShowSidebarIcon>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0px 30px 0px 0px;
  box-shadow: 4px -4px 10px 0px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  line-height: 122%;
  box-sizing: border-box;
  padding: 0px 7px;
  transform: ${(props) => (props.$showSidebar ? 'translateX(0)' : 'translateX(-180px)')};
  transition: all 0.5s;
  background-color: white;
`;

const ShowSidebar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MapDraftCount = styled.div`
  padding: 20px 8px;
  font-size: 15px;
  line-height: 122%;
`;
const Hr = styled.hr`
  width: 100%;
  height: 1.5px;
  background-color: ${colors.lightGray};
  border: none;
`;

const MapList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ShowSidebarIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  transform: ${(props) => (props.$showSidebar ? 'rotate(0)' : 'rotate(180deg)')};
`;

const DeleteMap = styled.div`
  padding: 4px 10px 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
`;

const DeleteMapCount = styled.div`
  display: flex;
  gap: 6px;
`;

const CheckBox = styled.div`
  width: 14px;
  height: 14px;
  border: 1.5px solid ${(props) => (props.$isAllChecked ? colors.mainColor : colors.darkGray)};
  border-radius: 4px;
  background-color: ${(props) => (props.$isAllChecked ? colors.mainColor : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DeleteBtn = styled.div`
  pointer: cursor;
`;

export default CreateMapSidebar;
