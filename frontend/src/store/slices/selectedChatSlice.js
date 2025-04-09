import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: false,
    selectedChatDetails: null
}

const selectedChatSlice = createSlice({
    name: 'selectedChat',
    initialState,
    reducers: {
        setSelectedChat: (state, action) => {
            state.selectedChat = true
            state.selectedChatDetails = action.payload;
        }
    }
});

export const { setSelectedChat } = selectedChatSlice.actions;

export default selectedChatSlice.reducer;
