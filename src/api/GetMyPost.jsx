import GetApi from './GetApi';

function GetMyPost() {
  return GetApi('/community/mypost', 'GetMyPost');
}

export default GetMyPost;
