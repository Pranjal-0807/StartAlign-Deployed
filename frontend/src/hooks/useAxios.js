import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
const authURL = import.meta.env.VITE_BASE_URL_AUTH_SERVER;
const fileUploadURL = import.meta.env.VITE_BASE_URL_FILE_UPLOAD_SERVER;
const chatURL = import.meta.env.VITE_BASE_URL_CHAT_SERVER;

const axiosConfig = (url, method = 'GET', body, token, extraHeaders = {}) => {
    let fullURL;
    if (url.startsWith('/files')) {
        fullURL = `${fileUploadURL}${url}`;
    } else if (url.startsWith('/api')) {
        fullURL = `${chatURL}${url}`;
    } else {
        fullURL = `${baseURL}${url}`;
    }
    return {
        method: method,
        url: fullURL,
        data: body,
        headers: {
            Authorization: `Bearer ${token}`,
            ...extraHeaders
        }
    }
}

const useAxios = (method = 'GET') => {
    const makeRequest = async (url, body, extraHeaders = {}) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await axios.request(axiosConfig(url, method, body, accessToken, extraHeaders));
        } catch (error) {
            const errMsg = error?.response?.data?.message;
            if (errMsg !== "jwt expired") {
                throw error;
            }
            const refreshToken = localStorage.getItem('refreshToken');
            const res = await axios.post(`${authURL}/auth/token`, { token: refreshToken });
            const newToken = res?.data?.accessToken;
            localStorage.setItem('accessToken', newToken);
            return await axios.request(axiosConfig(url, method, body, newToken, extraHeaders));
        }
    }
    return [makeRequest];
};

export default useAxios;
