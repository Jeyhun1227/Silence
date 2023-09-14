import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});

// axiosInstance.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}}`;
//   return config;
// });

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error?.response?.data || { message: "Something went wrong" })
);

export default apiClient;
