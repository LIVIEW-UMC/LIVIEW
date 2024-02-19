import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SortButton from '../../assets/icon/SortButton';
import SortModal from './SortModal';

function PostArea1({ Event, Sort }) {
  const [areaClicked, setAreaClicked] = useState(false);

  useEffect(() => {
    function handleClick(event) {
      const targetElement = event.target;

      if (!targetElement.closest('.exclude-div')) {
        setAreaClicked(false);
      }
    }
    if (areaClicked) {
      document.addEventListener('click', handleClick);
    } else {
      document.removeEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [areaClicked]);

  return (
    <Container
      onClick={(event) => {
        event.stopPropagation();
        setAreaClicked((prevState) => !prevState);
      }}
    >
      <SortButton />
      {areaClicked ? <SortModal Name="exclude-div" Event={Event} Sort={Sort} /> : null}
    </Container>
  );
}

const Container = styled.div`
  min-width: 26px;
  max-width: 26px;
  height: 26px;
  margin-left: 40px;
  cursor: pointer;
`;

export default PostArea1;
