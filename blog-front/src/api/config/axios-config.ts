import axios from 'axios';

// 创建axios实例
const instance = axios.create({
    baseURL: 'http://localhost:8080', // 默认连接到本地开发服务器
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    // 允许发送跨域请求时携带cookie
    withCredentials: true
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在这里可以添加验证token等逻辑
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 如果响应成功，检查API格式
        const data = response.data;
        if (data && data.code === 200) {
            return response;
        } else {
            // 可以在这里处理业务错误码
            console.error('API返回错误:', data.message || '未知错误');
            return response;
        }
    },
    (error) => {
        // 处理网络错误
        if (error.response) {
            // 服务端返回错误
            console.error(`服务端错误: ${error.response.status}`, error.response.data);
        } else if (error.request) {
            // 请求发送但没有响应
            console.error('网络错误,没有收到响应:', error.request);
        } else {
            // 其他错误
            console.error('请求配置错误:', error.message);
        }
        return Promise.reject(error);
    }
);

export default instance; 