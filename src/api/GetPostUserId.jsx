import GetApi from './GetApi';

function GetPostUserId(TourId) {
  return GetApi(`/community/userId/${TourId}`, 'GetPostUserId');
}

export default GetPostUserId;
