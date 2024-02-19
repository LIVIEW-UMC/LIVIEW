import GetApi from './GetApi';

function GetUser() {
  return GetApi('/users', 'GetUser');
}

export default GetUser;
