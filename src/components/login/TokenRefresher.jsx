import axios from 'axios';

export default function TokenRefresher() {
  const refreshAPI = axios.create({
    baseURL: 'https://jin-myserver.shop',
    headers: { 'Content-type': 'application/json' },
  });

  const interceptor = axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config;

      if (error.response.status === 401) {
        await axios({
          url: 'https://jin-myserver.shop/auth/reissue',
          method: 'Post',
          data: {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
          },
        })
          .then((res) => {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);

            originalConfig.headers.Authorization = `Bearer ${res.data.accessToken}`;

            return refreshAPI(originalConfig);
          })
          .then(() => {
            window.location.reload();
          });
      }
      return Promise.reject(error);
    },
  );
  return () => {
    axios.interceptors.response.eject(interceptor);
  };
}
