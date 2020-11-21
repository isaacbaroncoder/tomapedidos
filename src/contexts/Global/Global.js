import {createContext} from 'react';

const Global = createContext({
    isLoading: true,
    isLogin: false,
    user:{},
});

export default Global;