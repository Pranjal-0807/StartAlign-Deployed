import useAxios from "../../hooks/useAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    loading: false,
    error: null
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleAsyncAction(builder, fetchUsers, "users");
    }
});

export default usersSlice.reducer;

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

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, thunkAPI) => {
        try {
            const [makeRequest] = useAxios("GET");
            const response = await makeRequest("/users");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);
