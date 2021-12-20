import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types/reduxState';
import { UserType } from '../types/user';

// 초기 상태
const initialState: UserState = {
    id: 0,
    email: '',
    firstname: '',
    lastname: '',
    birthday: '',
    profileImage: '',
    isLogged: false
};

// 리듀서와 액션을 동시에 만드는 createSlice 함수
// name은 action의 prefix
// reducers의 이름은 name/reducers: key로 이루어짐.
const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedUser(state, action: PayloadAction<UserType>) {
            state = { ...action.payload, isLogged: true };
            return state;
        },
        initUser(state) {
            state = initialState;
            return state;
        }
    }
});

export const userActions = { ...user.actions };

export default user;
