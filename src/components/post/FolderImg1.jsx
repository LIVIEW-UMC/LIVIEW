import styled from 'styled-components';
import FolderImg from '../../assets/icon/FolderImg';

function FolderImg1({ tf }) {
  return (
    <Container>
      <FolderImg tf={tf} />
    </Container>
  );
}

const Container = styled.div`
  width: 30px;
  height: 23.5px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export default FolderImg1;
