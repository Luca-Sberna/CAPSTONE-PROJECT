import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    loading: false,
    error: null,
    isLoggedIn: false,
    token: '',
    currentUser: '',
    currentUserEmail: '',
    currentUserId: '',
    creditCard: '',
    creditCardId: '',
    userCurrent: {},
    creditCardObj: {},
    game: {},
    isVip: {},
    ranking: {},
    currentGame: null,
    friendsList: [],
    favGamesList: [],
    userSelected: {},
    userProfileSelected: {},
};

const userSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
        },
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
        setCurrentUserEmail(state, action) {
            state.currentUserEmail = action.payload;
        },
        setCurrentUserId(state, action) {
            state.currentUserId = action.payload;
        },
        setCreditCard(state, action) {
            state.creditCard = action.payload;
        },
        setCreditCardObj(state, action) {
            state.creditCardObj = action.payload;
        },
        setCreditCardId(state, action) {
            state.creditCardId = action.payload;
        },
        setUserCurrent(state, action) {
            state.userCurrent = action.payload;
        },
        setGame(state, action) {
            state.game = action.payload;
        },
        setIsVip(state, action) {
            state.isVip = action.payload;
        },
        setRanking(state, action) {
            state.ranking = action.payload;
        },
        setCurrentGame(state, action) {
            state.currentGame = action.payload;
        },
        addFriend: (state, action) => {
            const friendToAdd = action.payload;
            // Verifica se friendsList è un array, altrimenti inizializzalo come un array vuoto
            if (!Array.isArray(state.friendsList)) {
                state.friendsList = [];
            }
            // Verifica se l'amico non è già presente nella lista prima di aggiungerlo
            let isFriendPresent = false;
            for (const friend of state.friendsList) {
                if (friend.idUser === friendToAdd.idUser) {
                    isFriendPresent = true;
                    break;
                }
            }
            if (!isFriendPresent) {
                state.friendsList.push(friendToAdd);
            }
        },
        removeFriend: (state, action) => {
            const friendToRemove = action.payload;
            // Verifica se friendsList è un array, altrimenti inizializzalo come un array vuoto
            if (!Array.isArray(state.friendsList)) {
                state.friendsList = [];
            }
            // Filtra l'amico dalla lista
            state.friendsList = state.friendsList.filter(
                (friend) => friend.idUser !== friendToRemove.idUser
            );
        },
        addGameFav: (state, action) => {
            const gameToAdd = action.payload;
            // Verifica se friendsList è un array, altrimenti inizializzalo come un array vuoto
            if (!Array.isArray(state.favGamesList)) {
                state.favGamesList = [];
            }
            // Verifica se l'amico non è già presente nella lista prima di aggiungerlo
            let isGamePresent = false;
            for (const game of state.favGamesList) {
                if (game.idGame === gameToAdd.idGame) {
                    isGamePresent = true;
                    break;
                }
            }
            if (!isGamePresent) {
                state.favGamesList.push(gameToAdd);
            }
        },
        removeGameFav: (state, action) => {
            const gameToRemove = action.payload;
            // Verifica se favGamesList è un array, altrimenti inizializzalo come un array vuoto
            if (!Array.isArray(state.favGamesList)) {
                state.favGamesList = [];
            }
            // Filtra il gioco dalla lista dei preferiti e restituisci un nuovo array
            state.favGamesList = state.favGamesList.filter(
                (game) => game.idGame !== gameToRemove.idGame
            );
        },

        setUserSelected(state, action) {
            state.userSelected = action.payload;
        },
        setUserProfileSelected(state, action) {
            state.userProfileSelected = action.payload;
        },

    },
});



export const {
    setUsers,
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    isLoggedIn,
    logout,
    setToken, // Aggiungi l'azione per impostare il token
    setCurrentUser,
    setCurrentUserEmail,
    setCurrentUserId,
    setCreditCard,
    setCreditCardObj,
    setCreditCardId,
    setUserCurrent,
    setGame,
    setIsVip,
    removeVipStatus,
    setRanking,
    setCurrentGame,
    addFriend,
    removeFriend,
    addGameFav,
    removeGameFav,
    setUserSelected,
    setUserProfileSelected
} = userSlice.actions;

export default userSlice.reducer;
