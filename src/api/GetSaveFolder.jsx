import GetApi from './GetApi';

function GetSaveFolder() {
  return GetApi('/tours/folder?owner=false', 'GetSaveFolder');
}

export default GetSaveFolder;
