import GetApi from './GetApi';

function GetPostLike(PostId) {
  return GetApi(`/community/post/${PostId}/likes`, 'GetPostLike');
}

export default GetPostLike;
