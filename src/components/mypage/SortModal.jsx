import styled from 'styled-components';
import colors from '../../styles/colors';
import CheckMark from '../../assets/icon/CheckMark';

function SortModal({ Name, Event, Sort }) {
  return (
    <SortModalContainer
      className={Name}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <SortName>정렬기준</SortName>
      <SortOptionCotainer onClick={() => Event('option1')}>
        <SortOption>오래된순 분류</SortOption>
        {Sort === 'option1' ? <CheckMark /> : null}
      </SortOptionCotainer>
      <SortOptionCotainer onClick={() => Event('option2')}>
        <SortOption>최신순 분류</SortOption>
        {Sort === 'option2' ? <CheckMark /> : null}
      </SortOptionCotainer>
    </SortModalContainer>
  );
}

const SortModalContainer = styled.div`
  width: 131px;
  height: 114px;
  padding: 11px 5px 30px 5px;
  border-radius: 10px;
  box-shadow: 1px 1px 5.9px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 9999;
  background-color: ${colors.sortBackgroundColor};
  cursor: auto;
`;

const SortName = styled.div`
  width: 35px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.sortColor};
  margin-bottom: 15px;
  font-family: KNU20TRUTH-Regular;
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0;
  text-align: left;
`;

const SortOptionCotainer = styled.div`
  width: 121px;
  height: 22px;
  padding: 2px 5px;
  border-radius: 5px;
  border: 2px solid;
  box-sizing: border-box;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${colors.sortBackgroundColor};
  border-color: ${colors.sortBackgroundColor};
  &:hover {
    background-color: ${colors.sortOptontBackgroundColor};
    border-color: ${colors.sortOptontBorderColor};
  }
`;

const SortOption = styled.div`
  height: 18px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-family: KNU20TRUTH-Regular;
  font-size: 15px;
  font-weight: 400;
  line-height: 18.3px;
  letter-spacing: 0;
  text-align: left;
`;

export default SortModal;
