import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response.data || response,
  (error) => Promise.reject(error)
);

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default instance;
