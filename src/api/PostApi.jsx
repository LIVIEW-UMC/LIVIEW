import AxiosInstance from './AxiosInstance';

const PostApi = async (Url, PostData) => {
  try {
    const response = await AxiosInstance.post(Url, PostData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.error('Error :', error);
    return 'error';
  }
};

export default PostApi;
