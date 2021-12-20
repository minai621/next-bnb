import axios from './index';
import { UserType } from '../../types/user';

interface SignUpAPIBody {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    birthday: string;
}

export const signupAPI = (body: SignUpAPIBody) => {
    return axios.post<UserType>('/auth/signup', body);
};

export const loginAPI = (body: {email: string; password: string}) => {
    return axios.post<UserType>('/auth/login', body, {
        withCredentials: true
    });
};

export const meAPI = () => {
    return axios.get('/auth/me');
};

export const logoutAPI = () => {
    return axios.delete('/auth/logout');
};
