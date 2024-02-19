import PostApi from './PostApi';

function PostInFolder(name, tf) {
  const tfText = tf ? 'true' : 'false';

  const postdata = {
    name,
  };
  return PostApi(`/tours/folder?owner=${tfText}`, postdata);
}

export default PostInFolder;
