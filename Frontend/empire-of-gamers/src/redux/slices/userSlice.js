import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    loading: false,
    error: null,
    isLoggedIn: false,
    token: '',
    currentUser: '',
    currentUserId: '',
    selectedCard: {},
    creditCard: '',
    creditCardId: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsersStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess(state, action) {
            state.loading = false;
            state.users = action.payload;
        },
        fetchUsersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        isLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        logout(state, action) {
            state.isLoggedIn = false;
            state.token = ""; // Rimuovi o azzera il token

        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload;

        },
        setCurrentUserId(state, action) {
            state.currentUserId = action.payload;
        },
        setSelectedCard(state, action) {
            state.selectedCard = action.payload;
        },
        setCreditCard(state, action) {
            state.creditCard = action.payload;
        },
        setCreditCardId(state, action) {
            state.creditCardId = action.payload;
        },
    },
});

export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    isLoggedIn,
    logout,
    setToken, // Aggiungi l'azione per impostare il token
    setCurrentUser,
    setSelectedCard,
    setCurrentUserId,
    setCreditCard,
    setCreditCardId
} = userSlice.actions;

export default userSlice.reducer;
