import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        }
    }
});

export const { setUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//     user: null,
//     loading: false,
//     error: null,
// };

// const handleAsyncAction = (builder, action, stateKey) => {
//     builder
//         .addCase(action.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         }
//         )
//         .addCase(action.fulfilled, (state, { payload }) => {
//             state.loading = false;
//             state.user = payload;
//         })
//         .addCase(action.rejected, (state, { payload }) => {
//             state.loading = false;
//             state.error = payload;
//         });
// }

// export const signupUser = createAsyncThunk(
//     'auth/signupUser',
//     async (data, thunkAPI) => {
//         try {
//             const response = await axios.post(`${import.meta.env.VITE_BASE_URL_AUTH_SERVER}/auth/signup`, data);
//             return response.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message || "Signup failed");
//         }
//     }
// );

// export const loginUser = createAsyncThunk(
//     'auth/loginUser',
//     async (data, thunkAPI) => {
//         try {
//             const response = await axios.post(`${import.meta.env.VITE_BASE_URL_AUTH_SERVER}/auth/login`, data);
//             return response.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message || "Login failed");
//         }
//     }
// );

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         logout: (state) => {
//             state.user = null;
//         }
//     },
//     extraReducers: (builder) => {
//         handleAsyncAction(builder, signupUser, 'user');
//         handleAsyncAction(builder, loginUser, 'user');
//     }
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;