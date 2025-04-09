import { toast } from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    loading: false,
    error: null,
};

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async (receiverId, thunkAPI) => {
        try {
            const [makeRequest] = useAxios('GET');
            const response = await makeRequest(`/api/message/${receiverId}`);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async ({ receiverId, message }, thunkAPI) => {
        try {
            const [makeRequest] = useAxios('POST');
            const response = await makeRequest(`/api/message/send/${receiverId}`, { message });
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        emptyMessages: (state) => {
            state.messages = [];
        },
        setNewMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messages = action.payload.messages;
                state.loading = false;
                toast.success("Messages fetched successfully! 🚀");
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
                toast.error("Messages not found! ❌");
            })
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
                state.loading = false;
                toast.success("Message sent successfully! 🚀");
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
                toast.error("Message not sent! ❌");
            });
    },
});

export const { emptyMessages, setNewMessage } = messageSlice.actions;

export default messageSlice.reducer;

// PW
// import useAxios from "../../hooks/useAxios";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//     messages: [],
//     isLoading: false,
// };

// const messageSlice = createSlice({
//     name: "messages",
//     initialState,
//     reducers: {
//         // {
//         // for the message that will come from the socket
//         addMessage(state, action) {
//             const oldMessages = state.messages ?? []
//             state.messages = [...oldMessages, action.payload];
//         },
//         // }
//     },
//     extraReducers: (builder) => {
//         handleAsyncAction(builder, fetchMessages, "messages");
//         handleAsyncAction(builder, sendMessage, "messages");
//     },
// });

// export const { addMessage } = messageSlice.actions;

// export default messageSlice.reducer;

// const handleAsyncAction = (builder, action, stateKey, isDelete = false) => {
//     builder
//         .addCase(action.pending, (state) => {
//             state.isLoading = true;
//         })
//         .addCase(action.fulfilled, (state, { payload }) => {
//             state.isLoading = false;
//             if (isDelete) {
//                 state[stateKey] = state[stateKey].filter(
//                     (message) => message._id !== payload
//                 );
//             } else if (Array.isArray(payload)) {
//                 state[stateKey] = payload ?? [];
//             } else if (payload && typeof payload === "object") {
//                 state[stateKey] = [...state[stateKey], payload];
//             }
//         })
//         .addCase(action.rejected, (state) => {
//             state.isLoading = false;
//         });
// };

// export const fetchMessages = createAsyncThunk(
//     "messages/fetchMessages",
//     async (chatId, thunkAPI) => {
//         try {
//             const [makeRequest] = useAxios('GET');
//             const response = await makeRequest(`/chat-api/message/${chatId}`);
//             // console.log(response.data);
//             return response.data;
//         } catch {
//             console.log(error);
//             return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
//         }
//     }
// );

// export const sendMessage = createAsyncThunk(
//     "messages/sendMessage",
//     async (message, thunkAPI) => {
//         try {
//             const [makeRequest] = useAxios('POST');
//             const response = await makeRequest('/chat-api/message', message);
//             console.log(response.data);
//             return response.data;
//         } catch {
//             console.log(error);
//             return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
//         }
//     }
// );
