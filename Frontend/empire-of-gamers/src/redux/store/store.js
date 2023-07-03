import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        // Altri reducer/slice se presenti
    },
});

export default store;
