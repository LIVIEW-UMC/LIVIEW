import GetApi from './GetApi';

function GetPostId(TourId) {
  return GetApi(`/community/postId/${TourId}`, 'GetPostId');
}

export default GetPostId;
