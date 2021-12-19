import Axios from 'axios';

export const API_BASE_URL = 'http://localhost:8080';

const axios = Axios.create({
    baseURL: API_BASE_URL,
});

export default axios;
