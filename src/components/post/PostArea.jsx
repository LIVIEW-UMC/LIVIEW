import styled from 'styled-components';
import PostBox from './PostBox';
import CommentInputBox from './CommentInputBox';
import Commentbox from './Commentbox';

function PostArea() {
  return (
    <PostContainer>
      <PostBox />
      <CommentInputBox />
      <Commentbox />
      <Commentbox />
      <Commentbox />
      <Commentbox />
    </PostContainer>
  );
}
const PostContainer = styled.div`
  width: 840px;
  max-height: 1025px;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default PostArea;
