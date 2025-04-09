import useAxios from '../../hooks/useAxios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    subTasks: [],
    loading: false,
    error: null
};

const subTaskSlice = createSlice({
    name: "subTask",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleAsyncAction(builder, fetchSubTasks, 'subTasks')
        handleAsyncAction(builder, createSubTask, 'subTasks')
        handleAsyncAction(builder, deleteSubTask, 'subTasks', true)
    }
});

export default subTaskSlice.reducer;

const handleAsyncAction = (builder, action, stateKey, isDelete = false) => {
    builder
        .addCase(action.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(action.fulfilled, (state, { payload }) => {
            state.loading = false;
            if (isDelete) {
                state[stateKey] = state[stateKey].filter(subTask => subTask._id !== payload);
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

export const fetchSubTasks = createAsyncThunk(
    'subTask/fetchSubTasks',
    async (projectId, thunkAPI) => {
        try {
            const [makeRequest] = useAxios('GET');
            const response = await makeRequest(`/subTasks/${projectId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

export const createSubTask = createAsyncThunk(
    'subTask/createSubTask',
    async (subTask, thunkAPI) => {
        try {
            const [makeRequest] = useAxios('POST');
            const response = await makeRequest('/subTasks', subTask);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

export const deleteSubTask = createAsyncThunk(
    'subTask/deleteSubTask',
    async (subTaskId, thunkAPI) => {
        try {
            const [makeRequest] = useAxios('DELETE');
            await makeRequest(`/subTasks/${subTaskId}`);
            return subTaskId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
)
