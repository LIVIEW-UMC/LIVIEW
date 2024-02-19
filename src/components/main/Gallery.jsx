import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useState, useEffect } from 'react';
import BASE_URL from '../../config/baseUrl';

function Gallery({ sortedBy }) {
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/community?sortedBy=${sortedBy}&page=0`, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwODMzMTY2MywiZXhwIjoxNzA4MzMyMjYzfQ.58KQe81NbsdZnLpxSr2gmjiEKYmmJF58Q1BL_TNtnN8',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFetchData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MasonryInfiniteGrid column={5} gap={21} defaultDirection={'end'} align={'justify'} threshold={1000} style={{ width: '1007px' }}>
      {fetchData &&
        fetchData.map((item, index) => (
          <Link to={`/post/${item.postId}`}>
            <GalleryItem key={item.postId} src={item.imgUrl} alt={`img-${index}`} />
          </Link>
        ))}
    </MasonryInfiniteGrid>
  );
}

const GalleryItem = styled.img`
  width: 191px;
  margin-bottom: 21px;
  border-radius: 15px;
`;

export default Gallery;
