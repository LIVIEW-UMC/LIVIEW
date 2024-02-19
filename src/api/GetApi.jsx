import AxiosInstance from './AxiosInstance';
import Token from './Token';

const GetApi = async (Url, name) => {
  try {
    const response = await AxiosInstance.get(Url, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });

    console.log(name, response);

    return response.data;
  } catch (error) {
    console.error(`Error ${name} :`, error);
    return [];
  }
};

export default GetApi;
