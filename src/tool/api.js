import axios from 'axios';

// 创建axios实例
const api = axios.create({
    baseURL:'',// import.meta.env.VITE_APP_BASE_API, // process.env.VUE_APP_BASE_API, // api的base_url
    // timeout: 5000 // 请求超时时间
});

// 请求拦截器
api.interceptors.request.use(
    config => {
        // 可以在这里添加请求头等信息
        // 例如：config.headers['Authorization'] = 'Bearer your-token';
        return config;
    },
    error => {
        // 请求错误处理
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// 响应拦截器
api.interceptors.response.use(
    response => {
        // 可以在这里对响应数据进行处理
        // 例如：对于不同的响应状态码做不同处理
        const res = response.data;
        return response;
    },
    error => {
        // 响应错误处理
        console.log('err' + error); // for debug
        return Promise.reject(error);
    }
);

export default api;