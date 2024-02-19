import PostApi from './PostApi';

function PostTour(FolderId, TourId) {
  return PostApi(`/tours/folder/${FolderId}/${TourId}`);
}

export default PostTour;
