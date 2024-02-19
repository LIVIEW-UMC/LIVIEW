import AxiosInstance from './AxiosInstance';
import Token from './Token';

const DeleteApi = async (Url) => {
  try {
    const response = await AxiosInstance.delete(Url, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.error('Error:', error);
    return 'error';
  }
};

export default DeleteApi;
