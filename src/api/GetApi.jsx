import AxiosInstance from './AxiosInstance';

const GetApi = async (Url, name) => {
  try {
    const response = await AxiosInstance.get(Url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
