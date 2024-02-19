import GetApi from './GetApi';

function GetNotClassificationTour(MyUserId) {
  return GetApi(`/community/post/${MyUserId}`, 'GetNotClassificationTour');
}

export default GetNotClassificationTour;
