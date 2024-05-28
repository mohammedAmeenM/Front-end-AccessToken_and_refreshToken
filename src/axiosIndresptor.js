import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:4000/api"
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers['authorization'] = `${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            
            if (refreshToken) {
                try {
                    const response = await axios.post('http://localhost:4000/api/users/refresh-token', null, {
                        headers: {
                            'refreshToken': refreshToken
                        }
                    });

                    if (response.status === 200) {
                        const newAccessToken = response.data.accessToken;
                        localStorage.setItem('access_token', newAccessToken);
                        api.defaults.headers.common['authorization'] = `${newAccessToken}`;
                        originalRequest.headers['authorization'] = `${newAccessToken}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    console.error('Refresh token failed:', refreshError);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            } else {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
