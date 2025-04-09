import useAxios from "../../hooks/useAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    conversations: [],
    loading: false,
    error: null,
};

const handleAsyncAction = (builder, action, stateKey, isDelete = false) => {
    builder
        .addCase(action.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(action.fulfilled, (state, { payload }) => {
            state.loading = false;
            if (isDelete) {
                state[stateKey] = state[stateKey].filter(project => project._id !== payload);
            }
            else if (Array.isArray(payload)) {
                state[stateKey] = payload ?? [];
            }
            else if (payload && typeof payload === 'object') {
                state[stateKey] = [...state[stateKey], payload];
            }
        })

        .addCase(action.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
}


const conversationSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.conversations = action.payload;
                state.loading = false;
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(createPrivateConversation.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPrivateConversation.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.message === "Conversation already exists") return;
                state.conversations.push(action.payload);
            })
            .addCase(createPrivateConversation.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

    },
});

export default conversationSlice.reducer;

export const fetchConversations = createAsyncThunk(
    "conversations/fetchConversations",
    async (userId, thunkAPI) => {
        try {
            const [makeRequest] = useAxios('GET');
            const response = await makeRequest(`/api/conversation/${userId}`);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const createPrivateConversation = createAsyncThunk(
    "conversations/createPrivateConversation",
    async (data, thunkAPI) => {
        try {
            const [makeRequest] = useAxios('POST');
            const response = await makeRequest(`/api/conversation/new`, data);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);
