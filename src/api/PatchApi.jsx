import AxiosInstance from './AxiosInstance';

const PatchApi = async (Url, PatchData) => {
  try {
    const response = await AxiosInstance.patch(Url, PatchData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    console.log(response);

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return 'error';
  }
};

export default PatchApi;
