import GetApi from './GetApi';

function GetOtherUserInfo(UserId) {
  return GetApi(`/users/${UserId}`, 'GetOtherUserInfo');
}

export default GetOtherUserInfo;
