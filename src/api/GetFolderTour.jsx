import GetApi from './GetApi';

function GetFolderTour(FolderId, MyUserId) {
  return GetApi(`/tours/folder/detail/${FolderId}/${MyUserId}`, 'GetFolderTour');
}

export default GetFolderTour;
