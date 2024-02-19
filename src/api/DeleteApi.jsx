import AxiosInstance from './AxiosInstance';

const DeleteApi = async (Url) => {
  try {
    const response = await AxiosInstance.delete(Url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
