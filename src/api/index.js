import axios from "axios";
import router from "../router/index.js"; // pastikan path sesuai

const Api = axios.create({
  baseURL: 'http://pa_auth_jwt.test',
});

// Tambahkan token ke setiap request
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tangani error global: 401 dan 403
Api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      } else if (error.response.status === 403) {
        alert("Anda tidak memiliki izin untuk mengakses halaman ini.");
        router.push("/  "); // Atau halaman error khusus, misalnya: /forbidden
      }
    }
    return Promise.reject(error);
  }
);

export default Api;
