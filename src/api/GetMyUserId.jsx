import GetApi from './GetApi';

function GetMyUserId() {
  return GetApi('/users/myId', 'GetMyUserId');
}

export default GetMyUserId;
