import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice';
import projectReducer from './slices/projectSlice';
import subTaskReducer from './slices/subTaskSlice';
import socketReducer from './slices/socket/socketSlice';
import uploadFileReducer from './slices/uploadFileSlice';
import selectedChatReducer from './slices/selectedChatSlice';
import conversationReducer from './slices/conversationSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        socket: socketReducer,
        project: projectReducer,
        subTask: subTaskReducer,
        files: uploadFileReducer,
        messages: messageReducer,
        conversations: conversationReducer,
        selectedChat: selectedChatReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // serializableCheck: false // for all reducers
            serializableCheck: {
                ignoredPaths: ['socket.socket']
            } // for specific reducers
        })
});

export default store;
