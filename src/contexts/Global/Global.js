import {createContext} from 'react';

const Global = createContext({
    isReload: false,
    isLoading: true,
    isLogin: false,
    user:{},
    form: {
        editable: false,
        section:false,
        saving: false,
        action: false,
        form: {},
        sidebar: {}
    },
    updateIsLoading: ()=>{},
    updateForm: ()=>{},
    updateIsReload: ()=>{},
    resentForm: ()=>{},
});

export default Global;