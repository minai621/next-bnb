import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import {
    TypedUseSelectorHook,
    useSelector as useReduxSelector,
  } from 'react-redux';
import auth from './auth';
import common from './common';
import user from './user';
import registerRoom from './registerRoom';

const rootReducer = combineReducers({
    user: user.reducer,
    common: common.reducer,
    auth: auth.reducer,
    registerRoom: registerRoom.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

// HYDRATE는 서버에서 번들링된 js파일을 html파일과 매핑해준다.
const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        if (state === initialRootState) {
            return {
                ...state,
                ...action.payload,
            };
        }
        return state;
    }
    return rootReducer(state, action);
};

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore = () => {
    const store = configureStore({
        reducer,
        devTools: true,
    });
    initialRootState = store.getState();
    return store;
};

export const wrapper = createWrapper(initStore);
