import GetApi from './GetApi';

function GetIncompletedTour() {
  return GetApi('/tours/incompleted/simple', 'GetIncompletedTour');
}

export default GetIncompletedTour;
