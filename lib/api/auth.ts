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