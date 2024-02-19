import GetApi from './GetApi';

function GetMyFolder() {
  return GetApi('/tours/folder?owner=true', 'GetMyFolder');
}

export default GetMyFolder;
