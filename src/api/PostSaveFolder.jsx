import PostApi from './PostApi';

function PostSaveFolder(name) {
  const postdata = {
    name,
  };
  return PostApi('/tours/folder?owner=false', postdata);
}

export default PostSaveFolder;
