import GetApi from './GetApi';

function GetTourDetail(TourId) {
  return GetApi(`/community/post?tourId=${TourId}`, 'GetTourDetail');
}

export default GetTourDetail;
