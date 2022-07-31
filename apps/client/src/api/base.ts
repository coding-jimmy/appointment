import { initMakeApi } from '@c3/api';
import axios from 'axios';
const http = axios.create({
    baseURL: 'http://localhost:3333/api',
    timeout: 0,
    withCredentials: true,
    responseType: 'json',
});



// _http.interceptors.request.use(config => {
//     // const token = localStorage.getItem('token');
//     // if (token && config.headers) {
//     // config.headers.Authorization = `Bearer ${token}`;
//     // }
//     // return config;
// });

http.interceptors.response.use(
    res => {
        const { data } = res;
        return Promise.resolve(data);
    },

);

export const makeApi = initMakeApi({ rawHttp: http });
export { http }