import PostApi from './PostApi';

function PostPostLike(PostId) {
  return PostApi(`/community/post/${PostId}/likes`);
}

export default PostPostLike;
