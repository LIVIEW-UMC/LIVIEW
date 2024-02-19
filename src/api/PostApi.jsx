import AxiosInstance from './AxiosInstance';
import Token from './Token';

const PostApi = async (Url, PostData) => {
  try {
    const response = await AxiosInstance.post(Url, PostData, {
      headers: {
        Authorization: `Bearer ${Token}`,
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
