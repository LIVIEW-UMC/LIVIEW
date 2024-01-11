import styled from 'styled-components';
import colors from '../../styles/colors';
import Cancel from '../../assets/icon/Cancel';

const imageContextPopular = require.context('../../assets/dummy/popular', false, /\.(png)$/);
const imageContextPopularLiview = require.context('../../assets/dummy/popularLiview', false, /\.(png)$/);

function SearchModal() {
  const imagesPopular = imageContextPopular.keys().map(imageContextPopular);
  const namePopular = ['방콕', '뉴욕', '파리', '해변(여름)', '알프스 산맥', '일본 오사카(가을)'];

  const imagesPopularLiview = imageContextPopularLiview.keys().map(imageContextPopularLiview);
  const namePopularLiview = ['해외 도시', '국가정원', '서울 당일치기', '베니스', '이색 여행지', '대나무 숲'];

  return (
    <SearchModalContainer>
      <RecentSearch>
        <SectionTitle>최근 검색 기록</SectionTitle>
        <RecentSearchContainer>
          <RecentSearchItem>
            서울
            <Cancel />
          </RecentSearchItem>
          <RecentSearchItem>
            1박2일
            <Cancel />
          </RecentSearchItem>
          <RecentSearchItem>
            국내 여행지
            <Cancel />
          </RecentSearchItem>
          <RecentSearchItem>
            겨울 여행지
            <Cancel />
          </RecentSearchItem>
          <RecentSearchItem>
            데이트 코스
            <Cancel />
          </RecentSearchItem>
        </RecentSearchContainer>
      </RecentSearch>
      <PopularSearch>
        <SectionTitle>지역별/계절별 인기 동선</SectionTitle>
        <PopularContainer>
          {imagesPopular.map((image, index) => (
            <PopularItem key={index + 1}>
              <PopularItemImage src={image} alt={`img-${index}`} />
              <PopularItemName>{namePopular[index]}</PopularItemName>
            </PopularItem>
          ))}
        </PopularContainer>
      </PopularSearch>
      <PopularSearch>
        <SectionTitle>지역별/계절별 인기 동선</SectionTitle>
        <PopularContainer>
          {imagesPopularLiview.map((image, index) => (
            <PopularItem key={index + 1}>
              <PopularItemImage src={image} alt={`img-${index}`} />
              <PopularItemName>{namePopularLiview[index]}</PopularItemName>
            </PopularItem>
          ))}
        </PopularContainer>
      </PopularSearch>
    </SearchModalContainer>
  );
}

const SearchModalContainer = styled.div`
  display: inline-flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 27px;
  border-radius: 15px;
  background: white;
  width: 866px;
  position: absolute;
  top: 50px;
  left: 0px;
  z-index: 1;
`;

const RecentSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
`;

const SectionTitle = styled.div`
  font-family: Pretendard-Regular;
  font-weight: 400;
  line-height: 140%;
`;

const RecentSearchContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const RecentSearchItem = styled.div`
  display: flex;
  padding: 4px 6px;
  align-items: center;
  gap: 5px;
  background-color: ${colors.lightGray};
  color: ${colors.gray};
  border-radius: 15px;
  font-size: 13px;
`;

const PopularSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
`;

const PopularContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  flex-wrap: wrap;
`;

const PopularItem = styled.div`
  display: flex;
`;

const PopularItemImage = styled.img`
  width: 102px;
  height: 102px;
  border-radius: 10px 0px 0px 10px;
`;

const PopularItemName = styled.div`
  display: flex;
  width: 161px;
  height: 102px;
  padding: 10px 41px 10px 15px;
  align-items: center;
  box-sizing: border-box;
  border-radius: 0px 10px 10px 0px;
  background-color: ${colors.ivoryGray};
`;

export default SearchModal;
