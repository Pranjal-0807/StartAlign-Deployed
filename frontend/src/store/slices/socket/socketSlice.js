import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';

const initialState = {
    socket: null,
    onlineUsers: null
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        initializeSocket: (state, action) => {
            const token = localStorage.getItem('accessToken');
            const socket = io(import.meta.env.VITE_BASE_URL_CHAT_SERVER, {
                auth: {
                    token: `Bearer ${token}`
                },
                query: {
                    userId: action.payload,
                }
            });
            state.socket = socket;
        },

        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    }
});

export const { initializeSocket, setOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;
