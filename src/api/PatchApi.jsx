import AxiosInstance from './AxiosInstance';
import Token from './Token';

const PatchApi = async (Url, PatchData) => {
  try {
    const response = await AxiosInstance.patch(Url, PatchData, {
      headers: {
        Authorization: `Bearer ${Token}`,
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
