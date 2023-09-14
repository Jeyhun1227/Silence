import axios from "axios";
import Cookie from "js-cookie";
import head from "lodash/head";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = head(JSON.parse(Cookie.get("supabase-auth-token")));
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error?.response?.data || { message: "Something went wrong" })
);

export default apiClient;
